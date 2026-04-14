'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AuthUser = {
  id: number;
  username: string;
  display_name: string | null;
};

const VOLUME_KEY = 'setlist-volume';

export function usePreviewVolume() {
  const [volume, setVolume] = useState(() => {
    if (typeof window === 'undefined') return 0.7;
    const stored = localStorage.getItem(VOLUME_KEY);
    return stored !== null ? parseFloat(stored) : 0.7;
  });

  useEffect(() => {
    // Dispatch a custom event so any playing AudioButton can pick up the change
    localStorage.setItem(VOLUME_KEY, String(volume));
    window.dispatchEvent(new CustomEvent('setlist-volume-change', { detail: volume }));
  }, [volume]);

  return [volume, setVolume] as const;
}

export default function Header({ currentUser }: { currentUser: AuthUser | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = usePreviewVolume();
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sliderRef.current && !sliderRef.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    }
    if (showSlider) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSlider]);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
    setLoading(false);
  }

  const volumeIcon = volume === 0 ? 'volume_off' : volume < 0.4 ? 'volume_down' : 'volume_up';

  return (
    <div className="flex items-center gap-3">
      {/* Volume control */}
      <div className="relative" ref={sliderRef}>
        <button
          onClick={() => setShowSlider((s) => !s)}
          className="text-text-muted hover:text-text transition-colors p-1"
          title="Volume"
        >
          <span className="material-symbols-outlined text-lg">{volumeIcon}</span>
        </button>
        {showSlider && (
          <div className="absolute right-0 top-full mt-2 glass rounded-xl p-3 z-50 flex items-center gap-2 w-36">
            <span className="material-symbols-outlined text-sm text-text-muted">
              {volumeIcon}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 accent-pink cursor-pointer"
            />
          </div>
        )}
      </div>

      {currentUser ? (
        <>
          <Link
            href={`/${currentUser.username}`}
            className="text-sm font-semibold text-text hover:text-pink transition-colors"
          >
            {currentUser.display_name || currentUser.username}
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="text-xs text-text-muted hover:text-text transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-pink/50 disabled:opacity-50"
          >
            {loading ? '…' : 'Logout'}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-xs text-text-muted hover:text-text transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-xs font-semibold bg-pink/10 text-pink hover:bg-pink/20 transition-colors px-3 py-1.5 rounded-lg"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
