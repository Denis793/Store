import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export default function Section({ title, children, className = '', fullWidth = false }: Props) {
  const wrap = <div className={title ? 'mt-4' : ''}>{children}</div>;

  return (
    <section className={`py-10 ${className}`}>
      {fullWidth ? (
        <>
          {title && <h2 className="text-2xl font-semibold container">{title}</h2>}
          {wrap}
        </>
      ) : (
        <div className="container">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {wrap}
        </div>
      )}
    </section>
  );
}
