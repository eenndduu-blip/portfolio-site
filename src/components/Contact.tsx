import { Reveal } from "./Reveal";

const links = [
  { label: "Email", href: "mailto:hello@yourname.com", value: "hello@yourname.com" },
  { label: "Instagram", href: "#", value: "@yourname" },
  { label: "LinkedIn", href: "#", value: "/in/yourname" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-20 md:py-32 border-b border-[var(--color-border)]"
    >
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
          Contact
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.95] max-w-4xl">
          Let&rsquo;s build,
          <br />
          shoot, or show
          <br />
          something.
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-10 md:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-12 border-t border-[var(--color-border)] pt-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group cursor-pointer"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {link.label}
              </p>
              <p className="mt-2 text-lg md:text-xl relative inline-block">
                {link.value}
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-[var(--color-fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
