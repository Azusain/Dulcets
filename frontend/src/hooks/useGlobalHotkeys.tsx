import { useEffect, useCallback } from 'react';

interface HotkeyConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  callback: () => void;
  description?: string;
}

// Global hotkey hook for managing keyboard shortcuts
export function useGlobalHotkeys(hotkeys: HotkeyConfig[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger if user is typing in input fields
    if (
      event.target instanceof HTMLElement &&
      (event.target.tagName === 'INPUT' || 
       event.target.tagName === 'TEXTAREA' || 
       event.target.contentEditable === 'true')
    ) {
      return;
    }

    for (const hotkey of hotkeys) {
      const keyMatches = event.key.toLowerCase() === hotkey.key.toLowerCase();
      const ctrlMatches = !!event.ctrlKey === !!hotkey.ctrl;
      const altMatches = !!event.altKey === !!hotkey.alt;
      const shiftMatches = !!event.shiftKey === !!hotkey.shift;
      const metaMatches = !!event.metaKey === !!hotkey.meta;

      if (keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches) {
        event.preventDefault();
        event.stopPropagation();
        hotkey.callback();
        break;
      }
    }
  }, [hotkeys]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Specialized hook for search functionality
export function useSearchHotkey(onSearchOpen: () => void) {
  useGlobalHotkeys([
    {
      key: 'q',
      ctrl: true,
      callback: onSearchOpen,
      description: 'Open search (Ctrl+Q)'
    },
    {
      key: 'k',
      ctrl: true,
      callback: onSearchOpen,
      description: 'Open search (Ctrl+K) - Alternative'
    },
    {
      key: '/',
      callback: onSearchOpen,
      description: 'Open search (/) - Quick access'
    }
  ]);
}
