# **App Name**: CyberAware Interactive

## Core Features:

- Multi-Page Navigation: Create individual pages for the Intro, HackerTerminal, VictimPhone, CyberCell, SteganographyChallenge, and Conclusion sections of the demo.
- Hacker Terminal Simulation: Simulate a hacker's terminal with animated typing of commands like voice_clone, calling_victim(), and displaying OTP received.
- Voice Clone Playback: Play the AI-cloned voice audio file upon clicking the 'Call Victim' button in the HackerTerminal section.
- Victim Phone Simulation: Simulate SMS messages and banking alerts on a stylized phone UI in the VictimPhone section, triggered by button clicks.
- Cyber Cell Simulation: Show a dashboard representing the CyberCell attempting an IP trace, displaying a simulated trace failure.
- Steganography Challenge: Present a steganography challenge with an image and a link to an external decoder, along with a QR code image that links to a separately hosted steganography challenge page.
- Dynamic Narrative Generation: Generative AI tool for narrative text explaining each step, customized for presenter use, dynamically updating content in each section based on presenter flow. This feature uses a reasoning tool.

## Style Guidelines:

- Primary color: Intense, attention-getting purple (#9400D3) for a digital, slightly unsettling feel.
- Background color: Dark, muted purple (#1E0029), allowing the primary color and content to pop.
- Accent color: Electric blue (#007BFF), used sparingly for interactive elements and highlights.
- Body and headline font: 'Space Grotesk', sans-serif, for headlines and short amounts of body text; for longer text, use 'Inter'.
- Code font: 'Source Code Pro' monospace for displaying code snippets in the HackerTerminal.
- Use minimalist, outline-style icons to represent different sections and actions, maintaining a tech-focused aesthetic.
- Implement subtle fade or slide animations when transitioning between sections, and animated typing effects in the HackerTerminal, using Tailwind CSS classes.