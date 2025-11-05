import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        'fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      <div className="relative mb-8 h-80 w-80 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm" />
        <div className="absolute inset-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-4xl font-bold text-white">mIA</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 rounded-full border border-cyan-400/30 bg-slate-700/80 px-3 py-1 text-xs text-cyan-400">
          Disconnected
        </div>
      </div>

      <div className="mb-8 space-y-4 text-center">
        <h1 className="text-4xl font-bold text-cyan-400">mIA</h1>
        <p className="text-lg font-medium text-cyan-300">Agenda con tu voz. mIA está escuchando.</p>
        <div className="flex items-center justify-center space-x-2 text-sm text-cyan-300/70">
          <span>🤖 ¡Hola! Soy mIA, tu asistente virtual</span>
        </div>
      </div>

      <Button
        onClick={onStartCall}
        className="transform rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-12 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-cyan-700"
      >
        Agendar
      </Button>

      <footer className="fixed right-0 bottom-8 left-0 flex justify-center">
        <div className="space-y-2 text-center">
          <p className="text-sm text-cyan-300/60">
            © 2025 suplente.mx - Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </section>
  );
};
