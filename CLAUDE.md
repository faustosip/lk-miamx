# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Install dependencies**: `pnpm install`
- **Start development server**: `pnpm dev` (runs on http://localhost:3000 with Turbopack)
- **Build for production**: `pnpm build`
- **Start production server**: `pnpm start`
- **Lint code**: `pnpm lint` (Next.js ESLint with TypeScript, import sorting, and Prettier)
- **Format code**: `pnpm format` (Prettier with auto-fix)
- **Check formatting**: `pnpm format:check`

## Project Architecture

This is a **LiveKit Voice Agent React starter** built with Next.js 15 and TypeScript. The app provides a real-time voice interface for LiveKit Agents with video streaming, screen sharing, and chat capabilities.

### Key Architecture Components

- **App Configuration**: `app-config.ts` - Central configuration for branding, features, and UI customization
- **LiveKit Integration**: Uses `@livekit/components-react` and `livekit-client` for real-time communication
- **State Management**: React hooks pattern with custom hooks in `/hooks/` directory
- **UI Framework**: Tailwind CSS with Radix UI components in `/components/ui/`
- **Connection Flow**: API route at `/app/api/connection-details/route.ts` handles LiveKit room connections

### Directory Structure

- `/app/` - Next.js 15 App Router structure with pages and API routes
- `/components/` - Reusable React components, organized by domain (livekit/, ui/, etc.)
- `/hooks/` - Custom React hooks for connection details, chat/transcription, and debugging
- `/lib/` - Shared utilities and TypeScript types

### Environment Configuration

Required environment variables in `.env.local`:

- `LIVEKIT_API_KEY` - LiveKit API key
- `LIVEKIT_API_SECRET` - LiveKit API secret
- `LIVEKIT_URL` - LiveKit server URL (e.g., wss://project.livekit.cloud)

### Key Features Configuration

The `AppConfig` interface in `/lib/types.ts` controls:

- Chat input support (`supportsChatInput`)
- Video input support (`supportsVideoInput`)
- Screen sharing (`supportsScreenShare`)
- Pre-connect buffering (`isPreConnectBufferEnabled`)
- Theming and branding options

### LiveKit Components

- **SessionView**: Main interface when connected to agent
- **AgentTile**: Displays agent avatar and status
- **MediaTiles**: Handles video/audio streams
- **Chat**: Real-time chat and transcription display
- **DeviceSelect**: Audio/video device selection

The app uses a Room-based architecture where users connect to LiveKit rooms to interact with voice agents.
