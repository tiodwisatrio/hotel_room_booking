"use client";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navlink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden text-sm bg-[var(--background)] rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              className="rounded-full"
              src={session.user.image || "/avatar.svg"}
              width={48}
              height={48}
              alt="avatar"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="md:block hidden py-2 px-5 grayscale-50 text-white hover:text-[var(--gold)] rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center p-2 justify-center text-sm text-white rounded-md md:hidden hover:text-[var(--gold)]"
      >
        {!isOpen ? (
          <IoMenu className="size-8" />
        ) : (
          <IoClose className="size-8" />
        )}
      </button>

      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !isOpen,
          block: isOpen,
        })}
      >

        <ul className="flex flex-col font-semibold text-[10px] capitalize p-4 mt-2  gap-y-2 rounded-sm md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 bg-transparent">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
            >
              Room
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>

          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
                >
                  My Reservation
                </Link>
              </li>

              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      className="block py-2 px-3 text-white hover:text-[var(--gold)] rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:pt-0">
              <button
                onClick={() => signOut()}
                className="md:hidden px-4 py-2.5 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                className="px-6 py-2.5 bg-[var(--gold)] text-white hover:bg-[var(--goldhover)] rounded-sm"
              >
                SignIn
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
