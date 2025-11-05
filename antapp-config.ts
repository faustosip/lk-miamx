import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'mIA - Auto Suplente',
  pageTitle: 'mIA Voice Agent',
  pageDescription: 'Tu asistente virtual de voz con IA',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#06b6d4',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#22d3ee',
  startButtonText: 'Agendar',

  agentName: 'mIA',
};
