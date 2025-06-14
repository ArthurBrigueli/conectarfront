import type { ReactNode } from "react";


type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main style={{ padding: "2rem" }}>
      {children}
    </main>
  );
}
