# Travelcam: Camera-Based Travel Guide

Travel camera that explains places and objects, translates text, and recommends itineraries based on the pictures it takes

Deployed at: [travelcam.vercel.app](https://travelcam.vercel.app)

⚠️ Travelcam is optimised for mobile. Please view on mobile device or in mobile simulator for best experience.

## How To Use App

The home page is the Camera Screen. Tap the shutter button to take a photo.

After taking a photo, the app will show the Explanation Screen, which will show the photo and an explanation from OpenAI. The prompt for this explanation is in `app/api/explain/route.ts` and can be customized.

The hamburger button in the top left opens the History Drawer, which shows all photos taken and a preview of their explanations in reverse chronological order. Tap any item in the drawer to open the Explanation Screen for that item. When the drawer is open, tap anywhere outside the drawer to close it.

The camera button in the top right navigates back to the Camera Screen.

History does not persist across browser sessions, and refreshing the page will clear all history.

![app screens](https://github.com/user-attachments/assets/d098244b-6329-4fc0-bf7d-9da88e34db94)

## How To Run App Locally

### Set Up Environment Variables

1. Copy `.env.example` to new file `.env.local`. Env vars in `.env.local` will only be available server-side unless otherwise specified. `.env.local` is ignored by Git via `.gitignore`.
2. Replace `OPENAI_API_KEY` in `.env.local` with your OpenAI API key. If you do not have one, create a new API key at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### Start Server

```zsh
npm i # Install dependencies
npm run dev # Start server
```

Open [http://localhost:3000](http://localhost:3000) in a browser to view the app.

### Run Tests

```zsh
npm t # Run all tests
```

Unit tests are currently located in the `app` folder next to each component.

## What I Would Do With More Time

- Allow uploads of images taken elsewhere
- Authentication to save history
- Deletion of pics in history
- Chat interface in explanation screen to ask follow-up questions
- Options to group history based on location, category, or manually
- Search of history by text
- Write more unit and integration tests to increase test coverage
- Write end-to-end tests for robustness

## Known Issues

### Peer Dependency Warning

You may notice the following warning when running `npm i`. This is because the `ai` package has a peer dependency on React 18 that conflicts with React 19 specified in `package.json`.

React 19 is the latest stable version, marked stable on Dec 5 2024, and also the default for new Next.js projects. I expect newer versions of `ai` coming soon to support React 19, which will resolve this warning.

```zsh
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: swr@2.2.5
npm warn Found: react@19.0.0
npm warn node_modules/react
npm warn   peerOptional react@"^18 || ^19 || ^19.0.0-rc" from @ai-sdk/react@1.0.7
npm warn   node_modules/@ai-sdk/react
npm warn     @ai-sdk/react@"1.0.7" from ai@4.0.22
npm warn     node_modules/ai
npm warn   8 more (ai, next, react-dom, react-icons, styled-jsx, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^16.11.0 || ^17.0.0 || ^18.0.0" from swr@2.2.5
npm warn node_modules/@ai-sdk/react/node_modules/swr
npm warn   swr@"^2.2.5" from @ai-sdk/react@1.0.7
npm warn   node_modules/@ai-sdk/react
npm warn
npm warn Conflicting peer dependency: react@18.3.1
npm warn node_modules/react
npm warn   peer react@"^16.11.0 || ^17.0.0 || ^18.0.0" from swr@2.2.5
npm warn   node_modules/@ai-sdk/react/node_modules/swr
npm warn     swr@"^2.2.5" from @ai-sdk/react@1.0.7
npm warn     node_modules/@ai-sdk/react
```
