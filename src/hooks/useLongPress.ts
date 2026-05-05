import { useRef, useCallback } from 'react';

interface UseLongPressOptions {
  onLongPress: () => void;
  threshold?: number;
}

export const useLongPress = ({ 
  onLongPress, 
  threshold = 600 
}: UseLongPressOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTargetTouched = useRef(false); // <--- Bloqueador de eventos duplicados

  const start = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    // Si es un evento de mouse pero ya se detectó touch, ignoramos
    if (isTargetTouched.current && event.type === 'mousedown') return;
    
    if (event.type === 'touchstart') {
      isTargetTouched.current = true;
    }

    timerRef.current = setTimeout(() => {
      onLongPress();
      if (navigator.vibrate) navigator.vibrate(50);
    }, threshold);
  }, [onLongPress, threshold]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // Reseteamos el flag de touch después de un breve delay
    setTimeout(() => {
      isTargetTouched.current = false;
    }, 100);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};