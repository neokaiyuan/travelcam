# Travelcam

Travel camera that explains, translates and recommends based on what you take pictures of

## Getting Started

### Set Up Environment Variables

1. Copy `.env.example` to new file `.env.local`. Env vars in `.env.local` will only be available server-side unless otherwise specified. `.env.local` is ignored by Git via `.gitignore`.
2. Create a new OpenAI API key from [OpenAI](https://platform.openai.com/api-keys)
3. Copy the API key and paste it into the `.env.local` file

### Run App Locally

```zsh
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run Tests

```zsh
npm test
```

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
