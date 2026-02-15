"use client";

import { LuMenu, LuSearch } from "react-icons/lu";
import Logo from "./Logo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuthModal } from "@/app/store/useAuthModalStore";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateListingModal } from "@/app/store/useCreateListingModal";

const Navbar = () => {
  const router = useRouter();
  //opening and closing the dropdown menu
  const [open, setOpen] = useState(false);

  //the ref for the user area
  const menuRef = useRef<HTMLDivElement | null>(null);

  //session
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, []);

  //on the modals now
  const { openRegister, openLogin } = useAuthModal();

  async function handleLogout() {
    await authClient.signOut();
    router.refresh();
  }

  const { open: openCreateListing } = useCreateListingModal();

  return (
    <nav className="fixed top-0 w-full h-18 lg:h-24 shadow-md z-100 bg-white">
      <div className="flex items-center justify-between h-full mx-auto w-[95%] md:w-[90%]">
        <Logo />

        {/* center navbar */}
        <div className="flex items-center gap-3 px-4 py-2 shadow-md border border-gray-200 rounded-full cursor-pointer">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Image
              src={"/images/home.png"}
              alt="home-icon"
              width={25}
              height={25}
            />
            <span className="hidden lg:block">Anywhere</span>
          </span>
          <span className="h-6 w-px bg-gray-300 md:block" />
          <span className="hidden md:block text-sm font-medium text-gray-700">
            Any week
          </span>
          <span className="h-6 w-px bg-gray-300 md:block" />
          <span className="hidden md:block text-sm text-gray-500">
            Add guest
          </span>

          <div className="w-8 h-8 text-white rounded-full bg-primary grid place-items-center">
            <LuSearch size={16} />
          </div>
        </div>

        {/* right hand navbar */}
        <div className="flex items-center gap-4 relative" ref={menuRef}>
          {session && !isPending && (
            <button
              onClick={openCreateListing}
              className="hidden md:block text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100  bg-gray-50"
            >
              Airbnb your home
            </button>
          )}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 hover:shadow-md transition cursor-pointer ">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="size-8 place-items-center grid rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <LuMenu size={18} />
            </button>
            {session && (
              <div className="relative size-8 rounded-full overflow-hidden">
                {session.user.image ? (
                  <Image
                    src={session.user?.image}
                    alt="user avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={"/images/image.png"}
                    alt="user avatar"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* dropdown menu */}
        {open && (
          <div className="absolute right-0 top-14 w-54 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden  px-4 py-2 ">
            <ul className="text-gray-800 text-sm flex flex-col">
              {session && !isPending && (
                <>
                  <li
                    onClick={openCreateListing}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Airbnb your home
                  </li>
                  <Link
                    href={"/favorites"}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Favorites
                  </Link>
                  <Link
                    href={"/reservations"}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Your reservations
                  </Link>
                  <Link
                    href={"/properties"}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Your properties
                  </Link>
                  <Link
                    href={"/trips"}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Your trips
                  </Link>
                </>
              )}

              <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                Help center
              </li>
              <div className="border-t my-1 border-gray-300" />
              {session ? (
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              ) : (
                <>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => openRegister()}
                  >
                    Signup
                  </li>
                  <li
                    onClick={() => openLogin()}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Signin
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
