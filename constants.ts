
import type { Language, Theme, ImageStyle } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-PT', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
  { code: 'bn-BD', name: 'Bengali', flag: '🇧🇩' },
  // Add more languages as needed
];

export const THEMES: Theme[] = [
  { id: 'adventure', name: 'Adventure', emoji: '🗺️' },
  { id: 'princess', name: 'Princess', emoji: '👑' },
  { id: 'space', name: 'Space', emoji: '🚀' },
  { id: 'dinosaurs', name: 'Dinosaurs', emoji: '🦖' },
  { id: 'superhero', name: 'Superhero', emoji: '🦸' },
  { id: 'mermaid', name: 'Mermaid', emoji: '🧜‍♀️' },
  { id: 'baking', name: 'Baking', emoji: '🍩' },
];

export const IMAGE_STYLES: ImageStyle[] = [
  { id: 'default', name: 'Default', promptExtension: 'A high-quality, modern digital illustration with photorealistic rendering, soft focus background, and clear, engaging foreground characters. The colors should be vibrant and the lighting natural. Character consistency is essential.' },
  { id: 'manga_sports', name: 'Manga Sports', promptExtension: 'in the style of a high-action, detailed Japanese sports manga, dynamic black and white arena background with selective color on the foreground character, dramatic lines, character consistency' },
  { id: 'shoujo_anime', name: 'Shoujo Anime', promptExtension: 'in a detailed shoujo anime style, soft colors, large expressive eyes, character in a Japanese school uniform, spring cherry blossom background, character consistency' },
  { id: '3d_papercraft', name: '3D Papercraft', promptExtension: 'in the style of a modern 3D papercraft or claymation illustration, flat vibrant colors, minimal shadow, clean edges, character consistency' },
  { id: 'warm_3d_cartoon', name: 'Warm 3D Cartoon', promptExtension: 'in a warm and joyful 3D cartoon style, soft lighting, focus on character expressions, bright interior background, character consistency' },
  { id: 'pixel_art', name: 'Pixel Art', promptExtension: 'in a detailed, modern pixel art illustration style, clear lines, vibrant colors, blue sky with stylized clouds, retro setting, character consistency' },
  { id: 'retro_comics', name: 'Retro Comics', promptExtension: 'in the style of a classic American retro cartoon or comic book illustration (e.g., late 80s/early 90s), bright colors, clean line art, slightly exaggerated expressions, suburban setting, character consistency' },
  { id: 'pop_art_comic', name: 'Pop Art Comic', promptExtension: 'in a gritty, exaggerated pop art comic book style, bold outlines, dotted halftone pattern background (Ben-Day dots), dramatic shadows, strong colors, character consistency' },
  { id: 'outline_art', name: 'Outline Art (Coloring Book)', promptExtension: 'in a clean coloring book style, realistic subject rendering with black and white outline background, character consistency' },
  { id: 'vintage_collage', name: 'Vintage Collage', promptExtension: 'in the style of a detailed vintage photo collage and still life, using real-world objects, old photographs, rustic paper textures, and handwritten notes, character consistency' }
];
