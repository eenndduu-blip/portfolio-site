"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/art", label: "Art" },
  { href: "/photography", label: "Photography" },
  { href: "/architecture", label: "Architecture" },
];

export function CategoryNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Discipline"
      className="sticky top-16 md:top-20 z-40 bg-[var(--color-bg)]/85 backdrop-blur-sm border-b border-[var(--color-border)]"
    >
      <ul className="flex items-center justify-center gap-2 md:gap-0 h-12 md:h-14">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 md:px-8 py-2 text-[11px] md:text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                  active
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                <span className="relative">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-fg)] origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
