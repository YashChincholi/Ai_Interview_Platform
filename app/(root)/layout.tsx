import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" width={38} height={32} alt="logo" />
        </Link>
        <h2 className="text-primary-100">Prepwise</h2>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
