import React from 'react';

export const Logo: React.FC = () => (
  <div className="w-10 h-10 bg-surface2 flex items-center justify-center rounded-lg">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The graduation cap */}
      <path d="M3.28125 9.01562L12 4.5L20.7188 9.01562L12 13.5312L3.28125 9.01562Z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* The head/shoulders part */}
      <path d="M6 11.25V16.5C6 17.5 7.5 19.5 12 19.5C16.5 19.5 18 17.5 18 16.5V11.25" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Tassel */}
      <path d="M18 9V12" className="stroke-text-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);