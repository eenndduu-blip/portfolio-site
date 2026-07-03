export function Footer() {
  return (
    <footer className="px-6 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
      <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      <p>Built in Next.js</p>
    </footer>
  );
}
