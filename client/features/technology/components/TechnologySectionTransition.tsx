export function TechnologySectionTransition() {
  return (
    <div
      className="relative h-[clamp(72px,9vw,132px)] overflow-hidden bg-bg-light"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-cta [clip-path:polygon(0_0,100%_0,100%_34%,0_100%)]" />
      <div className="absolute inset-0 bg-bg-dark [clip-path:polygon(0_0,100%_0,100%_25%,0_88%)]" />
    </div>
  );
}
