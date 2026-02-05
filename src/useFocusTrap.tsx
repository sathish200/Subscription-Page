import { useEffect, useRef, useCallback } from 'react';

export const useFocusTrap = (enabled: boolean) => {
  const trapRef = useRef<HTMLDivElement>(null);
  const focusableElementsCache = useRef<HTMLElement[] | null>(null);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !focusableElementsCache.current) return;
    const focusableElements = focusableElementsCache.current;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);
  useEffect(() => {
    if (!enabled || !trapRef.current) return;
    focusableElementsCache.current = Array.from(
      trapRef.current.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    );
    const trap = trapRef.current;
    trap.addEventListener('keydown', handleKeyDown);

    return () => {
      trap.removeEventListener('keydown', handleKeyDown);
      focusableElementsCache.current = null;
    };
  }, [enabled, handleKeyDown]);

  return trapRef;
};
