export function RedArrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-0 w-0 border-y-[27px] border-y-transparent ${
        direction === "right"
          ? "border-l-[27px] border-l-[#F15D59]"
          : "border-r-[27px] border-r-[#F15D59]"
      }`}
    />
  );
}
