import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="bg-[#FFFFFF0D] py-4 px-5">
      <h2 className="text-[var(--text-primary)] font-bold text-[14px]">{title}</h2>
      <div className="[&>*]:py-[10px]">{children}</div>
    </div>
  );
};

export default Section;
