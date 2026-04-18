'use client';

import { usePreviewAudio } from '@/lib/usePreviewAudio';

type PlayButtonProps = {
  playing: boolean;
  onToggle: () => void;
  disabled?: boolean;
  label?: string;
  /** 0..1 — draws an ember ring around the button as it fills. */
  progress?: number;
};

export function PlayButton({
  playing,
  onToggle,
  disabled,
  label,
  progress = 0,
}: PlayButtonProps) {
  if (disabled) return null;
  const angle = Math.max(0, Math.min(1, progress)) * 360;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative inline-flex items-center justify-center w-8 h-8 border border-rule-strong bg-paper hover:bg-mark-soft shrink-0 rounded-full transition-colors"
      title={playing ? 'Pause' : 'Vorschau abspielen'}
      aria-label={label || (playing ? 'Pause' : 'Abspielen')}
    >
      {progress > 0 && (
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(var(--color-ember) ${angle}deg, transparent ${angle}deg)`,
            WebkitMask:
              'radial-gradient(circle, transparent 56%, black 58%)',
            mask: 'radial-gradient(circle, transparent 56%, black 58%)',
            transition: 'background 120ms linear',
          }}
        />
      )}
      <span className="text-[0.68rem] leading-none mono-num relative z-10">
        {playing ? '❚❚' : '▶'}
      </span>
    </button>
  );
}

/** Self-contained player button. Owns its own audio instance. */
export default function AudioButton({ src, label }: { src: string | null; label?: string }) {
  const { playing, progress, toggle } = usePreviewAudio(src);
  if (!src) return null;
  return <PlayButton playing={playing} progress={progress} onToggle={toggle} label={label} />;
}
