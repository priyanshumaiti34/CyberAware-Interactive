// @ts-nocheck
// Core steganography logic for embedding and extracting text in image data.

// A unique sequence of bits to mark the end of the hidden message.
export const DELIMITER_BITS = '1111111111111110';

/**
 * Converts a string into a string of binary bits.
 * @param text The input string.
 * @returns A string of '0's and '1's representing the text.
 */
export function textToBits(text: string): string {
  let bitString = '';
  for (let i = 0; i < text.length; i++) {
    const bit = text[i].charCodeAt(0).toString(2).padStart(8, '0');
    bitString += bit;
  }
  return bitString;
}

/**
 * Converts a string of binary bits back into a string.
 * @param bits The input string of '0's and '1's.
 * @returns The decoded text string.
 */
export function bitsToText(bits: string): string {
  let text = '';
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.substring(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
}

/**
 * Embeds a secret message into the pixel data of an image.
 * @param originalImageData The ImageData object of the original image.
 * @param secretMessage The text message to hide.
 * @returns A new ImageData object with the message embedded.
 */
export function embedMessage(originalImageData: ImageData, secretMessage: string): ImageData {
  const messageBits = textToBits(secretMessage) + DELIMITER_BITS;
  const data = new Uint8ClampedArray(originalImageData.data); // Create a mutable copy

  if (messageBits.length > data.length) {
    throw new Error('Message is too long to be embedded in the image.');
  }

  for (let i = 0; i < messageBits.length; i++) {
    const bit = parseInt(messageBits[i], 10);
    // Modify the least significant bit (LSB) of the color channel
    data[i] = (data[i] & 0xfe) | bit;
  }

  return new ImageData(data, originalImageData.width, originalImageData.height);
}

/**
 * Extracts a hidden message from the pixel data of a steganographic image.
 * @param stegoImageData The ImageData object of the image containing a hidden message.
 * @returns The extracted secret message.
 */
export function extractMessage(stegoImageData: ImageData): string {
  const data = stegoImageData.data;
  let messageBits = '';
  
  for (let i = 0; i < data.length; i++) {
    const lsb = data[i] & 1;
    messageBits += lsb;

    // Check if we've found the delimiter
    if (messageBits.endsWith(DELIMITER_BITS)) {
      // Remove delimiter and convert bits to text
      return bitsToText(messageBits.substring(0, messageBits.length - DELIMITER_BITS.length));
    }
  }

  throw new Error('No delimiter found. Unable to extract a message.');
}
