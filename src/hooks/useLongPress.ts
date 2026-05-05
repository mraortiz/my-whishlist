import { useState, useRef, useCallback } from 'react';

interface UseLongPressOptions {
  threshold?: number;
  onLongPress: () => void;
  onClick?: () => void;
}

export const useLongPress = ({ 
  threshold = 600, 
  onLongPress, 
  onClick 
}: UseLongPressOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressActive, setIsLongPressActive] = useState(false);

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onLongPress();
      setIsLongPressActive(true);
      if (navigator.vibrate) navigator.vibrate(50);
    }, threshold);
  }, [onLongPress, threshold]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Si soltamos antes del threshold, podríamos disparar un click normal
    if (!isLongPressActive && onClick) {
      // onClick(); // Opcional: activar si querés manejar clicks normales aquí
    }
    
    setIsLongPressActive(false);
  }, [isLongPressActive, onClick]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};