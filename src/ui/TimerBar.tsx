import React from 'react';

interface TimerBarProps {
  timeLeft: number;
  totalTime: number;
  sectionName: string;
  timerActive: boolean;
}

export const TimerBar: React.FC<TimerBarProps> = ({ timeLeft, totalTime, sectionName, timerActive }) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-serif">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
        <div>
          <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest opacity-50 mb-0.5">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-lg font-bold uppercase tracking-widest truncate max-w-[120px] sm:max-w-none">{sectionName}</h2>
            {!timerActive && (
              <span className="text-[8px] sm:text-[10px] bg-black text-white px-1.5 py-0.5 font-bold animate-pulse shrink-0">PAUSED</span>
            )}
          </div>
          <p className="hidden md:block text-[10px] italic opacity-60">Do not turn the page until instructed.</p>
        </div>
        <div className="flex items-center sm:block">
          <span className="hidden xs:inline text-[10px] sm:text-xs uppercase tracking-widest mr-2 opacity-70">Remaining:</span>
          <span className={`text-base sm:text-xl font-mono font-bold ${!timerActive ? 'opacity-30' : ''}`}>{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};
