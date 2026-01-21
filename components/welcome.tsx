import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <section
      ref={ref}
      inert={disabled}
      className={cn(
        'fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-center px-4',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      {/* Header con logo mIA */}
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-5xl font-bold">
          <span className="text-white">m</span>
          <span className="text-cyan-400">I</span>
          <span className="text-white">A</span>
        </h1>
        <p className="text-lg text-gray-400">Agenda con tu voz.</p>
      </div>

      {/* Imagen principal - limpia sin overlays */}
      <div className="relative mb-8 w-full max-w-sm aspect-[4/5] overflow-hidden rounded-2xl border border-cyan-900/50 shadow-2xl shadow-cyan-900/20">
        <Image
          src="/avatarfp2.jpeg"
          alt="MIA - Asistente Virtual"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Botón de inicio */}
      <Button
        onClick={onStartCall}
        className="flex items-center gap-3 rounded-full bg-slate-800 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-700 border border-slate-700"
      >
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
          className="w-6 h-6"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="leading-tight">
          Presiona aquí<br/>para comenzar
        </span>
      </Button>

      {/* Footer */}
      <footer className="fixed right-0 bottom-6 left-0 flex justify-center items-center gap-2">
        <p className="text-sm text-gray-500">
          © Todos los derechos reservados - <span className="underline">Suplente MX</span> 2026
        </p>
        <span className="text-cyan-400">✦</span>
      </footer>
    </section>
  );
};
