"use client";

import { logout } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NavbarProps {
  userName?: string;
}

const Navbar = ({ userName }: NavbarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b mb-5">
      <nav className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" width={38} height={32} alt="logo" />
        </Link>
        <h2 className="text-primary-100">Prepwise</h2>
      </nav>

      {userName ? (
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">
            Hi,&nbsp;
            <span className="bg-gradient-rainbow animate-gradient-animation">
              {userName}
            </span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="text-sm px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-md transition-colors"
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Navbar;
