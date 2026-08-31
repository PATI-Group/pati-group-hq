export function Mark({ className = "mark invert" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" role="img" aria-label="PATI GROUP">
      <rect className="plate" x="6" y="6" width="108" height="108" />
      <text className="word" x="60" y="54">
        PATI
      </text>
      <text className="word" x="60" y="92">
        GROUP
      </text>
    </svg>
  );
}
