

import React, { useEffect, useRef, useState } from "react";

export default function Timer({
  initialSeconds,
  isActive,
  onTick,
  onTimeUp,
  stopWhen,
}) {
  const [remaining, setRemaining] = useState(initialSeconds || 0);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // Start / Reset timer
  useEffect(() => {
    if (!isActive || stopWhen) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 🔥 calculate absolute end time
    endTimeRef.current = Date.now() + (initialSeconds || 0) * 1000;

    intervalRef.current = setInterval(() => {
      const diff = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );

      setRemaining(diff);
      if (onTick) onTick(diff);

      if (diff <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (onTimeUp) onTimeUp();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, stopWhen, initialSeconds]);

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
      <span className="text-lg font-semibold text-red-600 w-[45px]">
        {format(remaining)}
      </span>
    </div>
  );
}
