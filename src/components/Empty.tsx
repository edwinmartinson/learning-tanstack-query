import * as React from "react";

type EmptyProps = {
  children: React.ReactNode;
};

export default function Empty({ children }: EmptyProps) {
  return (
    <div className="flex w-full items-center justify-center gap-3 p-3">
      {children}
    </div>
  );
}
