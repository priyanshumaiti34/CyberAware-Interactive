'use server';

/**
 * @fileOverview A flow for generating narrative text for the demo.
 * 
 * - getNarrative - A function that generates a narrative for a given topic.
 * - NarrativeInput - The input type for the getNarrative function.
 * - NarrativeOutput - The return type for the getNarrative function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NarrativeInputSchema = z.object({
  topic: z.enum(['intro', 'conclusion']).describe('The topic for the narrative.'),
});
export type NarrativeInput = z.infer<typeof NarrativeInputSchema>;

const NarrativeOutputSchema = z.object({
  narrative: z.string().describe('The generated narrative text.'),
});
export type NarrativeOutput = z.infer<typeof NarrativeOutputSchema>;

export async function getNarrative(input: NarrativeInput): Promise<NarrativeOutput> {
  return narrativeFlow(input);
}

const introPrompt = `You are a presenter for a cybersecurity demonstration at a school science exhibition called "Spark Forward 2025". 
The project is "CyberAware Interactive".
Generate a compelling and brief (2-3 sentences) introductory narrative. 
The narrative should welcome the audience and set the stage for an immersive look into a cyber attack, explaining its relevance in today's digital world.
Make it engaging for a general audience.`;

const conclusionPrompt = `You are a presenter for a cybersecurity demonstration at a school science exhibition called "Spark Forward 2025".
The project is "CyberAware Interactive".
Generate a compelling and brief (2-3 sentences) concluding narrative.
The narrative should summarize the key takeaway from the demonstration: that cyber threats are real but awareness and vigilance are powerful defenses.
End on a positive and empowering note about digital safety.`;

const narrativeFlow = ai.defineFlow(
  {
    name: 'narrativeFlow',
    inputSchema: NarrativeInputSchema,
    outputSchema: NarrativeOutputSchema,
  },
  async ({ topic }) => {
    const promptText = topic === 'intro' ? introPrompt : conclusionPrompt;

    const { output } = await ai.generate({
      prompt: promptText,
      output: {
          schema: NarrativeOutputSchema,
      }
    });

    return {
      narrative: output?.narrative ?? "An error occurred while generating the narrative.",
    };
  }
);
