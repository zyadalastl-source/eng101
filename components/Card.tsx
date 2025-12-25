import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-meu-dark/10 bg-meu-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-meu-dark/10 px-5 py-4">
      <div className="text-sm font-semibold text-meu-dark">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-meu-gray">{subtitle}</div> : null}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}
