import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "header" | "footer";
  id?: string;
}

/**
 * Consistent page section container.
 * Provides max-width centering and responsive horizontal padding.
 *
 * Desktop: 64px side padding, 1280px max-width
 * Mobile:  20px side padding, full-width
 */
export default function Section({
  children,
  className,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn("w-full", className)}>
      <div className="w-full mx-auto px-16 max-md:px-5">
        {children}
      </div>
    </Tag>
  );
}
