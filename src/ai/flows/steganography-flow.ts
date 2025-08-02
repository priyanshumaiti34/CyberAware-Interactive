'use server';

/**
 * @fileOverview A flow for generating an image for a steganography challenge.
 * 
 * - performSteganography - A function that handles the image generation.
 * - SteganographyInput - The input type for the performSteganography function.
 * - SteganographyOutput - The return type for the performSteganography function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SteganographyInputSchema = z.object({
  secret: z.string().describe('The secret message to embed in the image.'),
});
export type SteganographyInput = z.infer<typeof SteganographyInputSchema>;

const SteganographyOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type SteganographyOutput = z.infer<typeof SteganographyOutputSchema>;

const ImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export async function performSteganography(input: SteganographyInput): Promise<SteganographyOutput> {
  return steganographyFlow(input);
}

export const generateImage = ai.defineFlow(
    {
      name: 'generateImage',
      outputSchema: ImageOutputSchema,
    },
    async () => {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: 'Generate a high-resolution, realistic image of a serene landscape, like a mountain lake or a forest path. The image should be visually pleasing and appear like a normal photograph.',
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
        });
        const imageUrl = media?.url;
        if (!imageUrl) {
            throw new Error('Failed to generate image.');
        }
        return { imageUrl };
    }
);

const steganographyFlow = ai.defineFlow(
  {
    name: 'steganographyFlow',
    inputSchema: SteganographyInputSchema,
    outputSchema: SteganographyOutputSchema,
  },
  async ({ secret }) => {
    
    // Generate an image based on the secret message
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate an abstract, visually complex image that could conceptually hide the secret message: "${secret}". Do not include the text in the image. Focus on textures, patterns, and abstract shapes.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media?.url;
    if (!imageUrl) {
        throw new Error('Failed to generate image.');
    }

    return {
      imageUrl,
    };
  }
);
