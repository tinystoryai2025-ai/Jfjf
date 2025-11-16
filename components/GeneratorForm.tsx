
import React, { useState, useRef, ChangeEvent, DragEvent, useEffect } from 'react';
import type { StorybookResult } from '../types';
import { LANGUAGES, THEMES, IMAGE_STYLES } from '../constants';
import { generateStory } from '../services/storyService';
import { generateCartoonCharacter } from '../services/characterService';

// Fix: Removed local declarations for confetti and aistudio. These are now centralized in types.ts.

interface GeneratorFormProps {
  onGenerationStart: () => void;
  onGenerationComplete: (result: StorybookResult, theme: string, language: string) => void;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  apiKeySelected: boolean;
  setApiKeySelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerationStart, onGenerationComplete, credits, setCredits, apiKeySelected, setApiKeySelected }) => {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState(5);
  const [language, setLanguage] = useState(LANGUAGES[0].code);
  const [pages, setPages] = useState(8);
  const [theme, setTheme] = useState(THEMES[0].id);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLES[0].id);
  const [customStory, setCustomStory] = useState('');
  const [uploadedImage, setUploadedImage] = useState<{ url: string; type: string } | null>(null);
  const [cartoonImage, setCartoonImage] = useState<{ url: string; base64: string; mimeType: string; } | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cost = pages + 1; // 1 credit per page + 1 base credit.
  const hasEnoughCredits = credits >= cost;

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Optimistically assume key selection was successful to avoid race conditions
      setApiKeySelected(true);
      setError(''); // Clear previous key-related errors
    }
  };


  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const originalImageUrl = e.target?.result as string;
        setUploadedImage({ url: originalImageUrl, type: file.type });
        const base64String = originalImageUrl.split(',')[1];
        
        setIsPreviewLoading(true);
        setCartoonImage(null);
        setError('');
        try {
          const result = await generateCartoonCharacter(base64String, file.type);
          setCartoonImage(result);
        } catch (err: any) {
          console.error(err);
          let errorMessage = 'Could not create a cartoon preview. Please try another photo.';
           if (err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('quota') || err?.message?.includes('API key not valid') || err?.message?.includes('Requested entity was not found')) {
            errorMessage = 'Your API key is invalid or has insufficient quota. Please select a different API key to continue.';
            setApiKeySelected(false);
          }
          setError(errorMessage);
        } finally {
          setIsPreviewLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!cartoonImage) {
      setError('Please upload a photo and wait for the cartoon preview to generate.');
      return;
    }
    if (!childName.trim()) {
      setError("Please enter your child's name.");
      return;
    }
    if (!hasEnoughCredits) {
      setError('Not enough credits. Please purchase more from the pricing section below.');
      return;
    }
    setError('');
    setIsGenerating(true);
    onGenerationStart();

    try {
      const selectedStyle = IMAGE_STYLES.find(s => s.id === imageStyle);
      const result = await generateStory({
        cartoon_character_base64: cartoonImage.base64,
        cartoon_character_mime_type: cartoonImage.mimeType,
        child_name: childName,
        age: age,
        language: language,
        pages: pages,
        theme: theme,
        custom_prompt: customStory.trim() || null,
        image_style_prompt_extension: selectedStyle?.promptExtension || IMAGE_STYLES[0].promptExtension,
      });

      setCredits(prev => prev - cost); // Deduct credits
      onGenerationComplete(result, theme, language);
      
      // Trigger confetti
      window.confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });

    } catch (err: any) {
      console.error(err);
      let errorMessage = 'Something went wrong while creating your story. Please try again.';
      if (err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('quota') || err?.message?.includes('API key not valid') || err?.message?.includes('Requested entity was not found')) {
        errorMessage = 'Your API key is invalid or has insufficient quota. Please select a different API key to continue.';
        setApiKeySelected(false);
      }
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const ageEmojis = ['👶', '🧒', '👧', '👦', '🧑', '👨‍🎓', '🧑‍🚀'];
  const getAgeEmoji = (val: number) => ageEmojis[Math.floor((val-1) / 2)];

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-32" data-aos="fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Image Upload & Preview */}
        <div className="space-y-6">
          <div 
            className="relative aspect-square bg-white/5 border-2 border-dashed border-white/30 rounded-2xl flex flex-col items-center justify-center text-center p-8 transition-all hover:border-[#8b46ff] hover:bg-white/10 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileSelect} className="hidden" />
            {uploadedImage ? (
              <img src={uploadedImage.url} alt="Uploaded child" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt text-5xl text-[#8b46ff] mb-4"></i>
                <p className="font-semibold text-lg">Drag & drop photo here</p>
                <p className="text-sm text-[#e0e0ff]/60">or click to browse</p>
              </>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="font-bold text-xl mb-3 text-gradient">Cartoon Preview</h3>
            <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center relative">
              {isPreviewLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white"></div>
                    <p className="text-white mt-3 text-sm">Cartoonizing...</p>
                </div>
              )}
              {cartoonImage ? (
                <img src={cartoonImage.url} alt="Cartoon preview" className="w-full h-full object-cover rounded-lg" />
              ) : !isPreviewLoading && (
                <i className="fas fa-magic-wand-sparkles text-4xl text-[#e0e0ff]/50"></i>
              )}
            </div>
            <p className="text-xs text-center mt-3 text-[#e0e0ff]/60">Our AI ensures the same adorable face on every page!</p>
          </div>
        </div>
        
        {/* Right Side: Form */}
        <div className="relative">
          {!apiKeySelected && (
            <div className="absolute inset-0 bg-[#1a1a2e]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-2xl p-8 text-center">
              <i className="fas fa-key text-4xl text-[#ff6b9d] mb-4"></i>
              <h3 className="text-2xl font-bold text-white">API Key Required</h3>
              <p className="text-white/80 my-4 max-w-sm">
                To generate your magical storybook, please select a Google AI Studio API key.
              </p>
              <p className="text-xs text-white/60 mb-6">
                Billing is managed by Google. For more info, see the{' '}
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  billing documentation
                </a>.
              </p>
              <button 
                onClick={handleSelectKey} 
                className="text-lg font-bold text-white bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105 btn-glow"
              >
                Select API Key
              </button>
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-8 space-y-6">
            <h2 className="text-4xl font-bold text-white mb-2">Create Your Story</h2>
            
            <div>
              <label className="font-semibold mb-2 block">Child's Name</label>
              <input type="text" placeholder="e.g., Aryan" value={childName} onChange={e => setChildName(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8b46ff]" />
            </div>

            <div>
              <label className="font-semibold mb-2 block">Age: <span className="text-gradient font-bold">{age}</span> {getAgeEmoji(age)}</label>
              <input type="range" min="1" max="12" value={age} onChange={e => setAge(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="font-semibold mb-2 block">Language</label>
                  <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search language..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#8b46ff]"
                      />
                      <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8b46ff]" size={filteredLanguages.length > 5 ? 5 : filteredLanguages.length}>
                          {filteredLanguages.map(lang => (
                              <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                          ))}
                      </select>
                  </div>
              </div>
              <div>
                <label className="font-semibold mb-2 block">Pages</label>
                <select value={pages} onChange={e => setPages(parseInt(e.target.value))} className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8b46ff]">
                  {[4, 6, 8, 12, 20, 25, 50].map(p => <option key={p} value={p}>{p} Pages</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold mb-2 block">Theme</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {THEMES.map(th => (
                  <button key={th.id} onClick={() => setTheme(th.id)} className={`p-3 rounded-lg border-2 transition-all ${theme === th.id ? 'border-[#ff6b9d] bg-[#ff6b9d]/20' : 'border-white/20 bg-white/5 hover:border-white/40'}`}>
                    {th.emoji} {th.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold mb-2 block">Illustration Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {IMAGE_STYLES.map(style => (
                  <button 
                    key={style.id} 
                    onClick={() => setImageStyle(style.id)} 
                    className={`p-3 rounded-lg border-2 transition-all text-sm h-full ${imageStyle === style.id ? 'border-[#ff6b9d] bg-[#ff6b9d]/20' : 'border-white/20 bg-white/5 hover:border-white/40'}`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="customStory" className="font-semibold mb-2 block">Tell us your story idea (optional)</label>
              <textarea
                id="customStory"
                rows={6}
                value={customStory}
                onChange={e => setCustomStory(e.target.value)}
                placeholder="Example: Aryan finds a magic dragon egg that hatches into his best friend. Together they save the galaxy from evil robots and eat ice-cream on Mars!"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8b46ff] resize-none"
              ></textarea>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            
            <button onClick={handleGenerate} disabled={isGenerating || isPreviewLoading || !hasEnoughCredits} className="w-full text-xl font-bold text-white bg-gradient-to-r from-[#8b46ff] to-[#ff6b9d] px-12 py-5 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white mr-3"></div>
                  Creating Magic...
                </div>
              ) : (
                `Generate Magic Book (${cost} Credits)`
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorForm;
