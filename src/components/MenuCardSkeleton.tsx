import React from 'react';

export const MenuCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-slate-100 bg-white shadow-xs flex flex-col justify-between animate-pulse">
      <div>
        {/* Skeleton Image */}
        <div className="relative h-36 sm:h-40 md:h-44 w-full rounded-xl sm:rounded-2xl bg-slate-200/80 mb-2.5 sm:mb-3 overflow-hidden">
          {/* Skeleton Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            <div className="h-4 w-12 bg-slate-300/80 rounded-full" />
            <div className="h-4 w-10 bg-slate-300/80 rounded-full" />
          </div>
          {/* Skeleton Time Badge */}
          <div className="absolute bottom-2 right-2 h-5 w-14 bg-slate-300/80 rounded-full" />
        </div>

        {/* Skeleton Title & Description */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <div className="h-4 sm:h-5 bg-slate-200 rounded-md w-2/3" />
            <div className="h-3 w-10 bg-slate-200 rounded-full" />
          </div>
          <div className="h-3 bg-slate-100 rounded-md w-full" />
          <div className="h-3 bg-slate-100 rounded-md w-4/5" />
        </div>
      </div>

      {/* Skeleton Footer */}
      <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="space-y-1">
          <div className="h-2.5 w-14 bg-slate-100 rounded" />
          <div className="h-4 w-20 bg-slate-200 rounded" />
        </div>
        <div className="h-7 sm:h-8 w-20 sm:w-24 bg-slate-200/90 rounded-xl" />
      </div>
    </div>
  );
};

export const MenuGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <MenuCardSkeleton key={idx} />
      ))}
    </div>
  );
};
