# CyberAware Interactive

Welcome to **CyberAware Interactive**, an immersive and educational web application designed to demonstrate the anatomy of a modern cyber attack. This project was created for the "Spark Forward 2025" school science exhibition to raise awareness about digital security in an engaging and accessible way.

## Demonstration Flow

The application takes the user through a multi-stage narrative, showcasing how different cybercrime techniques can be combined in a sophisticated attack.

### 1. The Digital Footprint Analyzer
The journey begins by illustrating how seemingly harmless, publicly available information (from social media, photo tags, etc.) can be collected and pieced together to create a detailed, exploitable profile of an individual.

### 2. The Attack Simulation
This is the core of the demonstration, simulating a multi-step attack:
- **AI Voice Cloning:** The attacker uses a public voice sample to create a realistic AI clone of a trusted person's voice.
- **Social Engineering:** The attacker uses the cloned voice in a spoofed call to manipulate the victim into revealing a One-Time Password (OTP) sent to their phone.
- **Fraudulent Transaction:** With the OTP, the attacker authorizes a financial transaction, completing the heist.

### 3. Steganography Challenge
Users are introduced to steganography—the art of hiding data in plain sight. This interactive module allows users to:
- Generate an AI image.
- Embed a secret message into the image using Least Significant Bit (LSB) steganography.
- See the original and ciphered images side-by-side to understand how the data is hidden without visible changes.

### 4. Latest Scams in India
To connect the demonstration to the real world, this section presents recent news and statistics about major cyber scams in India using interactive, flipping flashcards.

### 5. Conclusion
The demonstration concludes with a summary of the key takeaways, empowering users with the knowledge that awareness and vigilance are their strongest defenses against cyber threats.

## How It Works: The Technology Stack

This project is built on a modern, robust tech stack to deliver a seamless and interactive experience.

- **Frontend:**
  - **Next.js:** A React framework for building fast, server-rendered applications.
  - **React & TypeScript:** For building a type-safe, component-based user interface.
  - **Tailwind CSS & ShadCN UI:** For a sleek, modern, and fully responsive design system.
  - **Framer Motion:** For smooth page transitions and animations.

- **Backend & Artificial Intelligence:**
  - **Genkit (Google AI):** The entire AI backbone is powered by Genkit, which orchestrates calls to Google's Gemini models for:
    - **Narrative Generation:** Dynamically creating the introductory, concluding, and contextual text throughout the demo.
    - **AI Image Generation:** Creating the images used in the steganography challenge.
    - **Simulated Voice Analysis:** Generating the "analysis" text for the voice cloning simulation.

- **Steganography Implementation:**
  - The LSB steganography is implemented from scratch using **TypeScript** and the browser's built-in **HTML Canvas API**. No external libraries are used for the core logic. It works by manipulating the least significant bits of an image's pixel data to encode text information invisibly.

## Requirements & Setup

To run this project locally, you will need the following:

1.  **Node.js and npm** (or a compatible package manager like yarn/pnpm).
2.  **A Gemini API Key** from Google AI Studio.

### Local Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a new file named `.env.local` in the root of the project.
    - Add your Gemini API key to this file:
      ```
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:3000`.
