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
      <div className="mb-8 space-y-4 text-center">
        <h1 className="text-4xl font-bold text-cyan-400">mIA</h1>
        <p className="text-lg font-medium text-cyan-300">Agenda con tu voz.</p>
      </div>

      <Button
        onClick={onStartCall}
        className="transform rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-12 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-cyan-700"
      >
        {startButtonText}
      </Button>

      <footer className="fixed bottom-8 left-0 right-0 flex justify-center">
        <p className="text-sm text-cyan-300/60">
          © Todos los derechos reservados - Suplente MX 2026
        </p>
      </footer>
    </section>
  );
};
