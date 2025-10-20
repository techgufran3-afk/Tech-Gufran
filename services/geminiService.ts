
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface ImageData {
    base64: string;
    mimeType: string;
}

export const generateHuggingImage = async (childData: ImageData, adultData: ImageData): Promise<string> => {
    const model = 'gemini-2.5-flash-image';
    const prompt = `Using the two provided images, one of a person as a child and one as an adult, generate a new, photorealistic image. In this new image, the adult version of the person should be gently hugging their younger, child self. The interaction must look natural and heartwarming. Both individuals should be clearly visible and recognizable from the source images. Replace the original backgrounds with a single, soft, smooth, and simple background with natural lighting to create a cohesive and artistic portrait. Ensure the final image is high quality.`;

    const childImagePart = {
        inlineData: {
            data: childData.base64,
            mimeType: childData.mimeType,
        },
    };

    const adultImagePart = {
        inlineData: {
            data: adultData.base64,
            mimeType: adultData.mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [childImagePart, adultImagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            throw new Error("No image was generated in the response.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};
