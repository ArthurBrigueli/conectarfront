
import type { ReactNode } from "react";
import Navbar from "../components/NavBar/NavBar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
