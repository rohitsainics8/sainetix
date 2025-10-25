import { GoogleGenAI, Type } from "@google/genai";

const handleGeminiError = (error: any, context: string): Error => {
    console.error(`Error in ${context}:`, error);

    let userFriendlyMessage = `Failed to ${context}. The model may be busy or the prompt could be too complex. Please try again.`;

    // Check for common API error patterns
    const errorMessage = (error?.message || '').toLowerCase();
    const errorDetails = (error?.details || '').toLowerCase();
    const fullErrorString = `${errorMessage} ${errorDetails}`;

    if (fullErrorString.includes('rate limit') || fullErrorString.includes('quota') || fullErrorString.includes('resource_exhausted') || fullErrorString.includes('429')) {
        userFriendlyMessage = "You've made too many requests in a short period. Please wait a minute before trying again.";
    } else if (fullErrorString.includes('api key') && (fullErrorString.includes('invalid') || fullErrorString.includes('not found'))) {
        userFriendlyMessage = "Your API key is invalid or has expired. Please try entering it again.";
    } else if (fullErrorString.includes('prompt was blocked') || fullErrorString.includes('safety')) {
        userFriendlyMessage = "Your prompt was blocked for safety reasons. Please modify your request and try again.";
    } else if (fullErrorString.includes('billing') || fullErrorString.includes('account')) {
        userFriendlyMessage = "There might be an issue with your billing account. Please check your Google Cloud project settings.";
    }
    
    return new Error(userFriendlyMessage);
};


export const generateWebsiteConcept = async (prompt: string, apiKey: string): Promise<{ html: string; css: string; js: string; }> => {
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro", // Using a powerful model for a complex code generation task
      contents: `
        You are an expert web developer. Create a complete, single-page website based on the following prompt.
        The website should be visually appealing, responsive, and include relevant sections.
        Provide the HTML, CSS, and JavaScript code separately.
        The HTML should include placeholders for content where appropriate.
        The CSS should be modern and clean. Use a dark theme.
        The JavaScript should be minimal, for things like smooth scrolling or simple animations if needed. Do not use any external libraries.
        
        Prompt: "${prompt}"
        
        Return the response as a JSON object with three keys: "html", "css", and "js".
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            html: {
              type: Type.STRING,
              description: "The complete HTML code for the single-page website."
            },
            css: {
              type: Type.STRING,
              description: "The complete CSS code for the website."
            },
            js: {
              type: Type.STRING,
              description: "The JavaScript code for any interactivity."
            }
          },
          required: ["html", "css", "js"]
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    return result;

  } catch (error) {
    throw handleGeminiError(error, 'generate website concept');
  }
};


export const generateLogoConcept = async (prompt: string, style: string, apiKey: string): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey });

  const fullPrompt = `A high-quality, professional logo. The logo should be on a clean, solid light gray background. The subject of the logo is: "${prompt}". The style should be: ${style}.`;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 4,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("The model did not return any images. Try a different prompt.");
    }
    
    return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);

  } catch (error) {
    throw handleGeminiError(error, 'generate logos');
  }
};

export const generateCreativeIdeas = async (prompt: string, ideaType: string, apiKey: string): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey });

  const fullPrompt = `
    You are a creative strategist for a branding agency.
    Based on the following business concept, generate 5 creative ideas for the specified category.
    The ideas should be concise, catchy, and relevant.

    Business Concept: "${prompt}"
    Category: "${ideaType}"

    Return the response as a JSON object with a single key "ideas" which is an array of 5 strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 5 creative ideas."
            }
          },
          required: ["ideas"]
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    return result.ideas || [];

  } catch (error) {
    throw handleGeminiError(error, 'generate creative ideas');
  }
};