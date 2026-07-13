export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Endale Bekele logo mark"
    >
      <rect x="165" y="80" width="310" height="72" fill="currentColor" />
      <path
        d="M 335 152 L 205 355"
        stroke="currentColor"
        strokeWidth="72"
        strokeLinecap="square"
        fill="none"
      />
      <circle
        cx="320"
        cy="430"
        r="112"
        fill="none"
        stroke="currentColor"
        strokeWidth="72"
      />
      <rect x="165" y="558" width="310" height="72" fill="currentColor" />
    </svg>
  );
}
