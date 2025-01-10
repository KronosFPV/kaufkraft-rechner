import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
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

const AlertDescription = ({
  className = "",
  children,
  ...props
}: AlertDescriptionProps) => (
  <div
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </div>
);

export { Alert, AlertDescription };
