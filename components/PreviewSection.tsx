import React, { useState } from 'react';
import type { StorybookResult } from '../types';

// Fix: Removed local declaration for jspdf. This is now centralized in types.ts.

interface PreviewSectionProps {
  result: StorybookResult;
  theme: string;
  language: string;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ result, theme, language }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(-1); // -1 represents the cover
  const [isDownloading, setIsDownloading] = useState(false);

  const totalPages = result.pages.length;

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > -1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  /**
   * Loads a font using the CSS Font Loading API by injecting a @font-face rule.
   * @param {string} family The font family name.
   * @param {string} url The URL of the font file.
   * @returns {Promise<void>} A promise that resolves when the font is loaded.
   */
  const loadFont = async (family: string, url: string): Promise<void> => {
    if (document.fonts.check(`12px ${family}`)) {
      return; // Font already loaded
    }
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${family}';
        src: url('${url}');
      }
    `;
    document.head.appendChild(style);
    await document.fonts.load(`12px ${family}`);
    // The style tag can be removed after loading if desired, but it's harmless.
  };

  const handleDownloadPdf = async () => {
    if (!window.jspdf) {
      console.error("jsPDF library is not loaded.");
      alert("Could not start PDF download. Please try again in a moment.");
      return;
    }
    
    setIsDownloading(true);
    
    const rtlLanguages = new Set(['ar-SA']);
    
    /**
     * Wraps and renders text on a canvas, creating a centered block with center-aligned text.
     */
    const renderWrappedText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number, // page center x
      y: number, // page center y
      maxWidth: number,
      lineHeight: number,
      languageCode: string
    ) => {
      const isRtl = rtlLanguages.has(languageCode);
      const words = text.split(' ');
      let line = '';
      const lines: string[] = [];
  
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
  
      const textBlockHeight = lines.length * lineHeight;
      let currentY = y - textBlockHeight / 2;
  
      ctx.textBaseline = 'middle';
  
      if (isRtl) {
        ctx.textAlign = 'right';
        const startX = x + maxWidth / 2;
        for (const singleLine of lines) {
          ctx.fillText(singleLine, startX, currentY + lineHeight / 2);
          currentY += lineHeight;
        }
      } else {
        // This logic ensures the text block is centered, and the text within is also centered, as per the user's request.
        ctx.textAlign = 'center';
        const startX = x; // x is already the center of the page
        for (const singleLine of lines) {
          ctx.fillText(singleLine, startX, currentY + lineHeight / 2);
          currentY += lineHeight;
        }
      }
    };


    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 30;

      const fontConfig: { [key: string]: { url: string; name: string } } = {
        'bn-BD': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosansbengali/NotoSansBengali-Regular.ttf', name: 'NotoSansBengali' },
        'hi-IN': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosansdevanagari/NotoSansDevanagari-Regular.ttf', name: 'NotoSansDevanagari' },
        'ja-JP': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosansjp/NotoSansJP-Regular.otf', name: 'NotoSansJP' },
        'ko-KR': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosanskr/NotoSansKR-Regular.otf', name: 'NotoSansKR' },
        'zh-CN': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosanssc/NotoSansSC-Regular.otf', name: 'NotoSansSC' },
        'ar-SA': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/notosansarabic/NotoSansArabic-Regular.ttf', name: 'NotoSansArabic' },
        'default': { url: 'https://cdn.jsdelivr.net/gh/google/fonts/main/ofl/lora/Lora-VariableFont_wght.ttf', name: 'Lora' }
      };
      const selectedFont = fontConfig[language] || fontConfig['default'];
      await loadFont(selectedFont.name, selectedFont.url);

      const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

      // --- Cover Page (Adjusted for Portrait) ---
      const coverCanvas = document.createElement('canvas');
      coverCanvas.width = pageWidth;
      coverCanvas.height = pageHeight;
      const coverCtx = coverCanvas.getContext('2d')!;
      coverCtx.fillStyle = '#0a0a15';
      coverCtx.fillRect(0, 0, pageWidth, pageHeight);
      
      const coverImg = await loadImage(result.character_image_url);
      const coverImgDim = 200; // Make image larger on portrait cover
      coverCtx.drawImage(coverImg, (pageWidth - coverImgDim) / 2, pageHeight * 0.2, coverImgDim, coverImgDim);
      
      coverCtx.font = `bold 32px ${selectedFont.name}`;
      coverCtx.fillStyle = '#ffffff';
      renderWrappedText(coverCtx, result.storybook_title, pageWidth / 2, pageHeight * 0.55, pageWidth - margin * 2, 40, language);
      doc.addImage(coverCanvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, pageWidth, pageHeight);
      
      // --- Story Pages (New Layout: Image page then Text page) ---
      const bgImg = await loadImage(result.decorative_background_url);
      
      for (const page of result.pages) {
        // --- Illustration Page ---
        doc.addPage();
        const pageImg = await loadImage(page.image_url);
        doc.addImage(pageImg, 'JPEG', 0, 0, pageWidth, pageHeight);

        // --- Text Page ---
        doc.addPage();
        const textCanvas = document.createElement('canvas');
        textCanvas.width = pageWidth;
        textCanvas.height = pageHeight;
        const textCtx = textCanvas.getContext('2d')!;
        
        textCtx.drawImage(bgImg, 0, 0, textCanvas.width, textCanvas.height);
        
        textCtx.font = `22px ${selectedFont.name}`;
        textCtx.fillStyle = '#2c2421'; // Darker, book-like text color
        renderWrappedText(textCtx, page.text, textCanvas.width / 2, textCanvas.height / 2, textCanvas.width * 0.6, 34, language);
        doc.addImage(textCanvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, pageWidth, pageHeight);

        // Page number on the text page, centered and more subtle
        doc.setFontSize(9);
        doc.setTextColor(44, 36, 33); // Darker color to match text
        doc.text(String(page.page_number), pageWidth / 2, pageHeight - (margin/2), { align: 'center' });
      }

      doc.save(`${result.storybook_title.replace(/\s/g, '_')}.pdf`);

    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Sorry, there was an error creating the PDF. This may be due to a network issue fetching required assets. Please check your connection and try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleShare = async () => {
    const shareData = {
      title: `My TinyStory.ai Book: ${result.storybook_title}`,
      text: `Check out the magical storybook I created: "${result.storybook_title}"! You can make one too!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User might have cancelled the share, so no need to show an error
        console.log('Web Share API was cancelled or failed.', err);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Sharing not supported, but the story link has been copied to your clipboard!');
      } catch (err) {
        console.error('Failed to copy link to clipboard:', err);
        alert('Could not copy link. Please copy the URL from your browser bar.');
      }
    }
  };


  const isCover = currentPageIndex === -1;
  const currentPage = isCover ? null : result.pages[currentPageIndex];

  return (
    <section id="preview-section" className="py-20" data-aos="fade-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">Your Magical Storybook is Ready!</h2>
        <p className="text-xl sm:text-2xl text-[#e0e0ff]/80 mt-2">Click on the pages to turn them.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Side: Actions & Info */}
        <div className="lg:sticky lg:top-28 space-y-4">
           <h3 className="text-2xl font-bold text-gradient text-center lg:text-left">{result.storybook_title}</h3>
           <p className="text-center lg:text-left text-[#e0e0ff]/70">Your hero's adventure awaits!</p>
           <div className="flex flex-col space-y-4 pt-4">
            <button 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="w-full text-lg font-bold text-white bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isDownloading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Generating PDF...
                </>
              ) : (
                <>
                  <i className="fas fa-file-pdf mr-2"></i> Download PDF
                </>
              )}
            </button>
            <button 
              onClick={handleShare}
              className="w-full text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-share-alt mr-2"></i> Share Story
            </button>
          </div>
        </div>

        {/* Right Side: Book */}
        <div className="lg:col-span-2 relative">
          <div className="aspect-[2/1.4] w-full max-w-4xl mx-auto bg-transparent rounded-2xl p-0 shadow-2xl relative flex items-center justify-center">
            {/* Book Spine */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 sm:w-6 bg-black/30 z-10 shadow-inner"></div>
            
            {/* Pages Container */}
            <div className="w-full h-full grid grid-cols-2 gap-0 relative">

              {/* Cover View */}
              {isCover && (
                <>
                  <div className="col-span-2 bg-cover bg-center rounded-lg flex flex-col items-center justify-center p-8 text-center cursor-pointer" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${result.character_image_url})`}} onClick={goToNextPage}>
                    <img src={result.character_image_url} alt="Hero" className="w-40 h-40 rounded-full border-4 border-white object-cover mb-4 shadow-lg"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{result.storybook_title}</h1>
                    <div className="mt-8 text-white/80 animate-pulse text-lg flex items-center">Click to open <i className="fas fa-arrow-right ml-2"></i></div>
                  </div>
                </>
              )}

              {/* Story Page View */}
              {!isCover && currentPage && (
                 <>
                  {/* Left Page (Image) */}
                  <div className="bg-white/5 rounded-l-lg flex items-center justify-center relative group cursor-pointer" onClick={goToPrevPage}>
                    <img src={currentPage.image_url} alt={`Illustration for page ${currentPage.page_number}`} className="w-full h-full object-cover rounded-l-lg"/>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-l-lg">
                        <i className="fas fa-arrow-left text-white text-4xl"></i>
                    </div>
                  </div>

                  {/* Right Page (Text) */}
                  <div 
                    className="text-[#5c4033] rounded-r-lg p-8 sm:p-12 flex flex-col relative overflow-hidden group cursor-pointer font-serif bg-cover bg-center" 
                    style={{ backgroundImage: `url(${result.decorative_background_url})` }}
                    onClick={goToNextPage}
                  >
                    <div className="flex-grow flex items-center justify-center z-10">
                        <p className="text-lg sm:text-xl text-center leading-relaxed story-text max-w-full bg-[#FDF6E3]/80 backdrop-blur-sm p-4 rounded-lg">
                            {currentPage.text}
                        </p>
                    </div>
                    <div className="text-right text-sm font-bold text-[#5c4033]/70 absolute bottom-4 right-6 z-10">
                        {currentPage.page_number}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-r-lg z-20">
                        <i className="fas fa-arrow-right text-white text-4xl"></i>
                    </div>
                  </div>
                 </>
              )}
            </div>
            
            {/* Navigation Arrows (Absolute) */}
            {!isCover && (
                <button onClick={goToPrevPage} className="absolute left-[-1.5rem] md:left-[-2.5rem] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                  <i className="fas fa-chevron-left"></i>
                </button>
            )}

            {currentPageIndex < totalPages - 1 && (
                <button onClick={goToNextPage} className="absolute right-[-1.5rem] md:right-[-2.5rem] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                  <i className="fas fa-chevron-right"></i>
                </button>
            )}

          </div>
          {/* Page Indicator */}
          <div className="text-center mt-6 text-sm text-[#e0e0ff]/70">
            {isCover ? 'Cover' : `Page ${currentPageIndex + 1} of ${totalPages}`}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
