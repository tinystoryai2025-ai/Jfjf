import { GoogleGenAI, Modality } from "@google/genai";

export const generateCartoonCharacter = async (photo_base64: string, mime_type: string): Promise<{ url: string; base64: string; mimeType: string; }> => {
  // Fix: Initialize GoogleGenAI inside the function to use the latest API key after user selection.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: photo_base64,
              mimeType: mime_type,
            },
          },
          {
            text: 'Convert this photo of a child into a vibrant, friendly cartoon character for a storybook. The style should be cute and magical, like a modern animated movie (e.g., Disney, Pixar). Preserve recognizable features but in an animated style. The background should be a simple, solid, soft color.',
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
          const base64 = part.inlineData.data;
          const returnedMimeType = 'image/jpeg';
          return {
            url: `data:${returnedMimeType};base64,${base64}`,
            base64: base64,
            mimeType: returnedMimeType,
          };
        }
      }
    }
    
    // FIX: Throw a more specific error if no image data is found or if the response structure is invalid.
    console.error("Invalid API response for character generation:", JSON.stringify(response, null, 2));
    throw new Error("No image data found in response. The request may have been blocked for safety reasons.");
  } catch (error) {
    console.error("Error generating cartoon character:", error);
    throw error;
  }
};