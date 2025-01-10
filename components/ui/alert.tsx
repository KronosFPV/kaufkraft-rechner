import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Alert = ({ className = "", children, ...props }: AlertProps) => (
  <div 
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export { Alert };
