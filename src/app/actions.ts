'use server';

import { performSteganography, type SteganographyInput, generateImage } from '@/ai/flows/steganography-flow';
import { cloneVoice, type CloneVoiceInput } from '@/ai/flows/voice-cloning-flow';
import { getNarrative as getNarrativeFlow, type NarrativeInput } from '@/ai/flows/narrative-flow';

export async function generateSteganographyImage(input: SteganographyInput) {
  try {
    const result = await performSteganography(input);
    return result;
  } catch (error) {
    console.error("Error in steganography flow:", error);
    return null;
  }
}

export async function generateInitialImage() {
  try {
    const result = await generateImage();
    return result;
  } catch (error) {
    console.error("Error in generateInitialImage flow:", error);
    return null;
  }
}

export async function simulateVoiceClone(input: CloneVoiceInput) {
    try {
        const result = await cloneVoice(input);
        return result;
    } catch (error) {
        console.error("Error in voice cloning flow:", error);
        return { analysis: "Voice cloning failed. Using fallback." };
    }
}

export async function getNarrative(input: NarrativeInput) {
    try {
        const result = await getNarrativeFlow(input);
        return result;
    } catch (error) {
        console.error("Error in narrative flow:", error);
        return null;
    }
}
