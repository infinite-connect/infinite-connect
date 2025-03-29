import React from 'react';

export const HeaderCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
);
