import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { StorybookResult, StoryPage } from '../types';

// This is a client-side simulation of the requested `api.tinytales.ai` backend.
// In a real application, this logic would live on a server.
// The API key is sourced from environment variables, as per the requirements.

interface GenerationParams {
  cartoon_character_base64: string;
  cartoon_character_mime_type: string;
  child_name: string;
  age: number;
  language: string;
  pages: number;
  theme: string;
  custom_prompt: string | null;
  image_style_prompt_extension: string;
}

// Helper function to generate a decorative background for text pages
const generateDecorativeBackground = async (theme: string): Promise<string> => {
  // Fix: Initialize GoogleGenAI inside the function to use the latest API key after user selection.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const prompt = `Create a beautiful, minimalist storybook page background based on the theme of '${theme}'. The design should feature small, cute, watercolor-style illustrations scattered gracefully around the borders, leaving the large central area completely blank for text. The overall background color should be a warm, light cream (like #FDF6E3). The illustrations should be sparse, charming, and not overwhelming. For a 'baking' theme, this might be little donuts and cupcakes. For 'space', tiny stars and planets. The final image should be a ready-to-use page background.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // FIX: Safely access response data to prevent crashes when the API returns no candidates (e.g., due to safety blocks).
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return part.inlineData.data; // Return base64 string
        }
      }
    }

    // FIX: Throw a more specific error if no image data is found or if the response structure is invalid.
    console.error("Invalid API response for decorative background:", JSON.stringify(response, null, 2));
    throw new Error("No image data found for decorative background. The request may have been blocked for safety reasons.");
  } catch (error) {
    console.error("Error generating decorative background:", error);
    // In a real app, you might want a fallback placeholder image here
    throw error;
  }
};

// Helper function to generate an image for a single story page
const generatePageImage = async (characterBase64: string, characterMimeType: string, prompt: string, stylePromptExtension: string): Promise<string> => {
  // Fix: Initialize GoogleGenAI inside the function to use the latest API key after user selection.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const fullPrompt = `Using the provided character reference image, create a storybook illustration for the following scene: "${prompt}". ${stylePromptExtension}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: characterBase64,
              mimeType: characterMimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // FIX: Safely access response data to prevent crashes when the API returns no candidates (e.g., due to safety blocks).
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return part.inlineData.data; // Return base64 string
        }
      }
    }
    
    // FIX: Throw a more specific error if no image data is found or if the response structure is invalid.
    console.error("Invalid API response for page image:", JSON.stringify(response, null, 2));
    throw new Error("No image data found in page image response. The request may have been blocked for safety reasons.");
  } catch (error) {
    console.error("Error generating page image:", error);
    // In a real app, you might want a fallback placeholder image here
    throw error;
  }
};


const storybookSchema = {
  type: Type.OBJECT,
  properties: {
    storybook_title: {
      type: Type.STRING,
      description: "A creative and magical title for the storybook."
    },
    pages: {
      type: Type.ARRAY,
      description: "An array of story pages.",
      items: {
        type: Type.OBJECT,
        properties: {
          page_number: {
            type: Type.INTEGER,
            description: "The sequential page number, starting from 1."
          },
          text: {
            type: Type.STRING,
            description: "The story text for this page. It should be engaging and age-appropriate."
          },
          image_prompt: {
            type: Type.STRING,
            description: "A highly detailed, vibrant, and magical illustration prompt for this page. The prompt should describe a scene featuring the main character, whose appearance is based on the provided cartoon character image."
          }
        },
        required: ['page_number', 'text', 'image_prompt']
      }
    }
  },
  required: ['storybook_title', 'pages']
};


export const generateStory = async (params: GenerationParams): Promise<StorybookResult> => {
  // Fix: Initialize GoogleGenAI inside the function to use the latest API key after user selection.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  console.log("Starting story generation with params:", params);
  
  try {
    
    const systemInstruction = `You are TinyStory.ai, a world-renowned AI for creating magical, personalized children's storybooks. Your stories are always positive, heartwarming, and tailored perfectly to the child's age. You must generate a complete story based on the user's request and provide it in a structured JSON format. The main character must always be the child's name provided.`;

    const userPrompt = `
      Based on the provided image of a cartoon character, please create a storybook with these details:
      - Child's Name: ${params.child_name}
      - Child's Age: ${params.age}
      - Language to write in: ${params.language}
      - Number of Pages: ${params.pages}
      - Theme: ${params.theme}
      - Custom Story Idea: ${params.custom_prompt || 'The user did not provide a custom prompt. Please create a story based on the selected theme.'}

      The story must be written in simple, engaging language suitable for a ${params.age}-year-old. The main character MUST be named ${params.child_name}.
      
      Generate vivid image prompts for each page. The image prompts should consistently describe the provided cartoon character, named ${params.child_name}, as the hero of the story in various scenes.
      
      Return ONLY the JSON object that adheres to the provided schema.
    `;
    
    const imagePart = {
      inlineData: {
        mimeType: params.cartoon_character_mime_type,
        data: params.cartoon_character_base64,
      },
    };

    const textPart = {
      text: userPrompt
    };
    
    console.log("Sending request to Gemini API for story text...");
    // Fix: Directly call ai.models.generateContent as per coding guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: storybookSchema,
      }
    });

    console.log("Received response from Gemini API for story text.");
    let jsonText = response.text.trim();
    // Fix: The model might wrap the JSON in markdown backticks. This removes them.
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    const storyContent = JSON.parse(jsonText) as {
      storybook_title: string;
      pages: Omit<StoryPage, 'image_url'>[];
    };

    console.log("Generating decorative background for theme:", params.theme);
    const decorativeBackgroundBase64 = await generateDecorativeBackground(params.theme);
    console.log("Decorative background generated.");

    console.log("Generating images for each page sequentially with delays to respect rate limits...");
    const pageImageBase64s: string[] = [];
    for (const [index, page] of storyContent.pages.entries()) {
      console.log(`Generating image for page ${page.page_number}...`);
      const imageBase64 = await generatePageImage(params.cartoon_character_base64, params.cartoon_character_mime_type, page.image_prompt, params.image_style_prompt_extension);
      pageImageBase64s.push(imageBase64);
      
      // Add a delay after each call, except the last one, to avoid hitting rate limits.
      if (index < storyContent.pages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
      }
    }

    const pagesWithImages: StoryPage[] = storyContent.pages.map((page, index) => ({
      ...page,
      image_url: `data:image/jpeg;base64,${pageImageBase64s[index]}`,
    }));

    const character_image_url = `data:image/jpeg;base64,${params.cartoon_character_base64}`;
    const decorative_background_url = `data:image/jpeg;base64,${decorativeBackgroundBase64}`;
    
    console.log("All page images generated. Storybook complete.");
    return { 
      storybook_title: storyContent.storybook_title,
      pages: pagesWithImages,
      character_image_url,
      decorative_background_url
    };

  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    // Re-throw the error to be handled by the UI component
    throw error;
  }
};

// A fallback function to provide mock data if the API fails
const generateMockStory = (params: GenerationParams): StorybookResult => {
    return {
        storybook_title: `${params.child_name}'s Galactic Ice Cream Adventure`,
        character_image_url: `data:image/jpeg;base64,${params.cartoon_character_base64}`,
        pages: Array.from({ length: params.pages }, (_, i) => ({
            page_number: i + 1,
            text: `This is page ${i + 1} of a magical mock story for ${params.child_name}. The theme is ${params.theme} and it is written in ${params.language}. The custom prompt was: "${params.custom_prompt}"`,
            image_prompt: `A vibrant cartoon illustration of ${params.child_name}, the hero, on page ${i + 1} of their epic adventure.`,
            image_url: `https://picsum.photos/seed/${params.child_name.replace(/\s/g, '-')}-${i + 1}/800/600`,
        })),
        decorative_background_url: `https://picsum.photos/seed/storybook-background-${params.theme}/1024/768`,
    };
};