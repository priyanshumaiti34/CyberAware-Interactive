// @ts-nocheck
import { embedMessage, extractMessage } from './steganography'; 

/**
 * Embeds a secret message into an image from a URL and returns a new Data URL for the stego image.
 * @param imageUrl The URL of the original image (e.g., /images/my_photo.png or a data URL).
 * @param secretMessage The text message to hide within the image.
 * @returns A Promise that resolves with the Data URL of the steganographic image, or rejects with an error.
 */
export async function embedMessageIntoImageUrl(
  imageUrl: string,
  secretMessage: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    // 1. Create an off-screen canvas to draw and manipulate the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error("Failed to get 2D rendering context from canvas."));
      return;
    }

    // 2. Load the image from the URL
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Essential for images from different origins/public folder
    img.onload = () => {
      // 3. Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // 4. Draw the original image onto the canvas
      ctx.drawImage(img, 0, 0);

      // 5. Get the ImageData object (pixel data) from the canvas
      const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        // 6. Call the core embedMessage function to get the stego ImageData
        const stegoImageData = embedMessage(originalImageData, secretMessage);

        // 7. Put the modified ImageData back onto the canvas
        ctx.putImageData(stegoImageData, 0, 0);

        // 8. Get the Data URL of the modified canvas
        const stegoImageUrl = canvas.toDataURL('image/png'); // Can specify 'image/jpeg' if preferred

        resolve(stegoImageUrl);
      } catch (error: any) {
        reject(new Error(`Steganography embedding failed: ${error.message}`));
      }
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image from URL: ${imageUrl}. Error: ${error}`));
    };

    img.src = imageUrl;
  });
}

/**
 * Extracts a secret message from an image loaded from a URL.
 * @param imageUrl The URL of the steganographic image.
 * @returns A Promise that resolves with the extracted secret message, or rejects with an error.
 */
export async function extractMessageFromImageUrl(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error("Failed to get 2D rendering context from canvas."));
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const stegoImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        const extracted = extractMessage(stegoImageData);
        resolve(extracted);
      } catch (error: any) {
        reject(new Error(`Steganography extraction failed: ${error.message}`));
      }
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image from URL for extraction: ${imageUrl}. Error: ${error}`));
    };

    img.src = imageUrl;
  });
}
