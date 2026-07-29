"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/architecture", label: "Architecture" },
  { href: "/art", label: "Art" },
  { href: "/photography", label: "Photo" },
  { href: "/", label: "Home" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-[18px] md:px-[34px] py-4 md:py-5 bg-[#0a0a0a] text-[#f2f2f0] border-b border-white/15">
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer shrink-0"
        aria-label="Endale Bekele — Home"
      >
        <Image
          src="/logo-white.svg"
          alt=""
          width={32}
          height={32}
          className="h-[26px] w-[26px] md:h-[32px] md:w-[32px]"
          priority
        />
        <span className="font-black lowercase tracking-[-0.08em] text-[clamp(16px,1.6vw,22px)]">
          endale.
        </span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="hidden md:flex justify-center gap-[clamp(22px,3vw,44px)] text-[15px] uppercase tracking-[0.06em] font-semibold absolute left-1/2 -translate-x-1/2"
      >
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:opacity-55 transition-opacity ${
                active ? "text-[#edc231]" : "text-[#f2f2f0]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="shrink-0 ml-auto w-[31px] grid gap-[6px] cursor-pointer bg-transparent border-0 p-0"
      >
        <span
          className={`block h-1 bg-[#f2f2f0] rounded-sm transition-transform duration-300 ${
            open ? "translate-y-[10px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-1 bg-[#f2f2f0] rounded-sm transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-1 bg-[#f2f2f0] rounded-sm transition-transform duration-300 ${
            open ? "-translate-y-[10px] -rotate-45" : ""
          }`}
        />
        </button>
      </header>

      <div
        className="fixed inset-0 bg-[#0a0a0a] text-[#f2f2f0] z-40 overflow-y-auto"
        style={{
          transform: open ? "translateX(0%)" : "translateX(100%)",
          visibility: open ? "visible" : "hidden",
          transition: open
            ? "transform 300ms cubic-bezier(0.16,1,0.3,1), visibility 0s"
            : "transform 300ms cubic-bezier(0.16,1,0.3,1), visibility 0s 300ms",
        }}
        aria-hidden={!open}
      >
        <ul className="flex flex-col px-6 md:px-[34px] pt-[100px] md:pt-[130px] pb-10 md:max-w-md">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/15">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-5 text-3xl font-black lowercase tracking-[-0.04em] cursor-pointer"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="border-b border-white/15">
            <a
              href="mailto:wedeendu@hotmail.com"
              onClick={() => setOpen(false)}
              className="block py-5 text-3xl font-black lowercase tracking-[-0.04em] cursor-pointer"
            >
              contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
