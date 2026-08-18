export function scrollToSectionProgress(
  section: HTMLElement | null,
  progress: number,
) {
  if (!section) return;

  const scrollDistance = section.offsetHeight - window.innerHeight;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: sectionTop + scrollDistance * progress,
    behavior: "smooth",
  });
}
