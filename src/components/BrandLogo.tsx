import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showPartnerBadge?: boolean;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showPartnerBadge = false,
  isDark = true,
}) => {
  const emblemSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-13 h-13' : 'w-10 h-10';
  const aziziHeight = size === 'sm' ? 'h-6 sm:h-7' : size === 'lg' ? 'h-9 sm:h-10' : 'h-7 sm:h-8';
  const titleSize = size === 'sm' ? 'text-xs sm:text-sm' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg';
  const groupSize = size === 'sm' ? 'text-[8px] sm:text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px] sm:text-[10px]';

  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 select-none ${className}`}>
      {/* 1. Yasin Time Official Brand Lockup */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className={`relative flex items-center justify-center rounded-xl p-1.5 transition-transform group-hover:scale-105 ${
          isDark
            ? 'bg-gradient-to-b from-[#0F1E33] to-[#081220] border border-[#C49A45]/40 shadow-md'
            : 'bg-[#FAF8F5] border border-[#C49A45]/50 shadow-sm'
        }`}>
          <img
            src="/assets/aistudio/Group_2__1__f9d88111.png"
            alt="Yasin Time Crest"
            className={`${emblemSize} object-contain drop-shadow-[0_2px_8px_rgba(196,154,69,0.25)]`}
          />
        </div>

        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif font-bold tracking-[0.08em] ${titleSize} ${
              isDark ? 'text-[#DFBA6B]' : 'text-[#9A7426]'
            }`}
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            YASIN TIME
          </span>
          <span
            className={`font-sans tracking-[0.32em] font-semibold mt-1 uppercase ${groupSize} ${
              isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
            }`}
          >
            GROUP
          </span>
        </div>
      </div>

      {/* 2. Co-branding "×" Luxury Partner Divider */}
      {showPartnerBadge && (
        <>
          <div className="flex items-center px-0.5">
            <span className={`text-xs sm:text-sm font-light select-none ${
              isDark ? 'text-[#C49A45]/70' : 'text-[#8C6D23]/70'
            }`}>
              ×
            </span>
          </div>

          {/* 3. Official Azizi Developments Logo uploaded by user */}
          <div className="flex items-center" title="Azizi Developments Rasmiy Strategik Hamkori">
            <div className={`relative overflow-hidden rounded-md border transition-all ${
              isDark
                ? 'border-[#C49A45]/30 hover:border-[#C49A45] shadow-sm'
                : 'border-[#C49A45]/40 hover:border-[#C49A45] shadow-sm'
            }`}>
              <img
                src="/assets/aistudio/image_f7142773.png"
                alt="Azizi Developments"
                className={`${aziziHeight} object-cover aspect-[2.1/1] block`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
