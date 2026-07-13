"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/art", label: "Art" },
  { href: "/photography", label: "Photo" },
  { href: "/architecture", label: "Architecture" },
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
    <header
      className="relative z-50 grid items-center grid-cols-[1fr_auto_1fr] gap-6 px-[18px] md:px-[34px] pt-[22px] pb-3 bg-[var(--color-bg)]"
    >
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer"
        aria-label="Endale Bekele — Home"
      >
        <Image
          src="/logo.svg"
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
        className="hidden md:flex justify-center gap-[clamp(22px,3vw,44px)] text-[15px] uppercase tracking-[0.06em] font-semibold"
      >
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[var(--color-fg)] hover:opacity-55 transition-opacity ${
                active ? "opacity-100" : ""
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
        className="justify-self-end w-[31px] grid gap-[6px] cursor-pointer bg-transparent border-0 p-0"
      >
        <span
          className={`block h-1 bg-[var(--color-fg)] rounded-sm transition-transform duration-300 ${
            open ? "translate-y-[10px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-1 bg-[var(--color-fg)] rounded-sm transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-1 bg-[var(--color-fg)] rounded-sm transition-transform duration-300 ${
            open ? "-translate-y-[10px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-[var(--color-bg)] z-40 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col px-6 pt-10">
          {links.map((l) => (
            <li
              key={l.href}
              className="border-b border-[var(--color-border)]"
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-5 text-3xl font-black lowercase tracking-[-0.04em] cursor-pointer"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
