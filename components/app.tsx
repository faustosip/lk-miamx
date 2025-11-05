'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Room, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import { SessionView } from '@/components/session-view';
import { Toaster } from '@/components/ui/sonner';
// import { Welcome } from '@/components/welcome'; // <-- Ya no usamos el Welcome original
import useConnectionDetails from '@/hooks/useConnectionDetails';
import type { AppConfig } from '@/lib/types';

// <-- Importamos Image para el avatar

// const MotionWelcome = motion.create(Welcome); // <-- Ya no usamos esto
const MotionSessionView = motion.create(SessionView);

// --- INICIO: Iconos para tu nuevo diseño ---
const IconPhone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-phone h-8 w-8"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconWifiOff = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-wifi-off h-5 w-5 text-gray-400"
  >
    <path d="M12 20h.01" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
    <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
    <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
    <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
    <path d="m2 2 20 20" />
  </svg>
);
// --- FIN: Iconos ---

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const room = useMemo(() => new Room(), []);
  const [sessionStarted, setSessionStarted] = useState(false);
  const { refreshConnectionDetails, existingOrRefreshConnectionDetails } =
    useConnectionDetails(appConfig);

  useEffect(() => {
    const onDisconnected = () => {
      setSessionStarted(false);
      refreshConnectionDetails();
    };
    const onMediaDevicesError = (error: Error) => {
      toastAlert({
        title: 'Encountered an error with your media devices',
        description: `${error.name}: ${error.message}`,
      });
    };
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);
    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room, refreshConnectionDetails]);

  useEffect(() => {
    let aborted = false;
    if (sessionStarted && room.state === 'disconnected') {
      Promise.all([
        room.localParticipant.setMicrophoneEnabled(true, undefined, {
          preConnectBuffer: appConfig.isPreConnectBufferEnabled,
        }),
        existingOrRefreshConnectionDetails().then((connectionDetails) =>
          room.connect(connectionDetails.serverUrl, connectionDetails.participantToken)
        ),
      ]).catch((error) => {
        if (aborted) {
          return;
        }
        toastAlert({
          title: 'There was an error connecting to the agent',
          description: `${error.name}: ${error.message}`,
        });
      });
    }
    return () => {
      aborted = true;
      room.disconnect();
    };
  }, [
    room,
    sessionStarted,
    appConfig.isPreConnectBufferEnabled,
    existingOrRefreshConnectionDetails,
  ]);

  // const { startButtonText } = appConfig; // <-- Ya no necesitamos esto

  return (
    <main>
      {/* --- INICIO: Tu Portada Personalizada (Imagen 1) --- */}
      {/* Reemplaza el <MotionWelcome> original */}
      <motion.div
        key="custom-welcome"
        initial={{ opacity: 1 }}
        animate={{ opacity: sessionStarted ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'linear', delay: sessionStarted ? 0 : 0.5 }}
        // Oculta la portada cuando la sesión inicia
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 text-white ${sessionStarted ? 'pointer-events-none hidden' : ''}`}
      >
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <header className="relative z-10 mb-6">
          <h1 className="mb-2 text-center text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              m<span className="neon-text sophia-glow text-cyan-300">IA</span>
            </span>
          </h1>
          <p className="text-center text-lg text-cyan-300/80">
            Agenda con tu voz. mIA está escuchando.
          </p>
        </header>
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <div className="avatar-container relative rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              <div className="relative h-full w-full">
                <Image
                  alt="Virtual Assistant Avatar"
                  src="/avatarfp2.jpeg" // <- Carga la imagen desde /public
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/20">
                  <div className="absolute right-4 bottom-4 left-4">
                    <div className="rounded-lg bg-black/60 p-3 backdrop-blur-sm">
                      <p className="text-sm font-medium text-white">
                        👋 ¡Hola! Soy mIA, tu asistente virtual
                      </p>
                      <p className="mt-1 text-xs text-gray-300">
                        Presiona &quot;Agendar&quot; para comenzar
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2 rounded-full bg-black/60 px-3 py-2 backdrop-blur-sm">
              <IconWifiOff />
              <span className="text-sm font-medium">Disconnected</span>
            </div>
          </div>

          {/* --- ¡BOTÓN FUNCIONAL! --- */}
          <div className="flex justify-center">
            <button
              onClick={() => setSessionStarted(true)} // <-- ¡AQUÍ ESTÁ LA MAGIA!
              disabled={sessionStarted} // Deshabilita el botón al hacer clic
              className="btn-primary flex transform items-center space-x-4 rounded-full px-12 py-6 text-xl font-bold text-white shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <IconPhone />
              <span>Agendar</span>
            </button>
          </div>
        </div>
        <div className="neon-text mt-8 text-center text-sm">
          © 2025{' '}
          <a
            href="https://suplente.mx/reservas/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cyan-300"
          >
            suplente.mx
          </a>{' '}
          – Todos los derechos reservados.
        </div>
      </motion.div>
      {/* --- FIN: Tu Portada Personalizada --- */}

      {/* --- INICIO: Interfaz de Llamada (Imagen 3) --- */}
      {/* Esta parte es la misma de antes, se mostrará cuando sessionStarted sea true */}

      {/* --- INICIO DE LA CORRECCIÓN --- */}
      {/* Envolvemos toda la lógica de la llamada en un renderizado condicional.
        Solo si 'sessionStarted' es true, se renderizará este bloque.
        Esto evita que ocupe espacio y cause el scroll.
      */}
      {sessionStarted && (
        <RoomContext.Provider value={room}>
          <RoomAudioRenderer />
          <StartAudio label="Start Audio" />
          <MotionSessionView
            key="session-view"
            appConfig={appConfig}
            disabled={!sessionStarted}
            sessionStarted={sessionStarted}
            // Ya no necesitamos la clase 'hidden' aquí
            initial={{ opacity: 0 }}
            animate={{ opacity: sessionStarted ? 1 : 0 }}
            transition={{
              duration: 0.5,
              ease: 'linear',
              delay: sessionStarted ? 0.5 : 0,
            }}
          />
        </RoomContext.Provider>
      )}
      {/* --- FIN DE LA CORRECCIÓN --- */}
      {/* --- FIN: Interfaz de Llamada --- */}

      <Toaster />
    </main>
  );
}
