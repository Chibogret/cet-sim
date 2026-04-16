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
    <div className="border-b border-black pb-2 mb-4 font-serif">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-bold uppercase tracking-widest">{sectionName}</h2>
            {!timerActive && (
              <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold animate-pulse">PAUSED</span>
            )}
          </div>
          <p className="text-xs italic">Do not turn the page until instructed to do so.</p>
        </div>
        <div className="text-left md:text-right mt-2 md:mt-0">
          <span className="text-sm uppercase tracking-widest mr-2">Time Remaining:</span>
          <span className={`text-xl font-bold ${!timerActive ? 'opacity-30' : ''}`}>{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};
