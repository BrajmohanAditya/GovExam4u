import React, { useEffect, useState, useRef } from "react";

export default function Timer({
  initialSeconds,
  isActive,
  onTick,
  onTimeUp,
  stopWhen,
}) {
  const [remaining, setRemaining] = useState(initialSeconds || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(initialSeconds || 0);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isActive || stopWhen) {
      // stop the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (isActive && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          const next = r - 1;
          if (onTick) onTick(next);
          if (next <= 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // intentionally not including onTick/onTimeUp in deps to avoid re-creating interval frequently
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, stopWhen]);

  useEffect(() => {
    if (onTick) onTick(remaining);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const format = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 border rounded-md shadow-sm">
      <span className="text-sm font-medium text-gray-700">Time Left:</span>
      <span className="text-lg font-semibold text-red-600  w-[45px]">
        {format(remaining)}
      </span>
    </div>
  );
}
