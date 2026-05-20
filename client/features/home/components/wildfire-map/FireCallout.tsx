import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FireCalloutProps {
  label: string;
  stats: {
    scale: string;
    delay: string;
    impact: string;
  };
  className: string;
  enterFrom: "left" | "right";
  range: [number, number];
  markerPosition?: "left" | "right";
  expandDirection?: "up" | "down";
  doesHaveAsterisk?: string;
}

export function FireCallout({
  label,
  stats,
  className,
  enterFrom,
  range,
  markerPosition = "right",
  expandDirection = "down",
  doesHaveAsterisk = "",
}: FireCalloutProps) {
  const offset = enterFrom === "left" ? "-10vw" : "10vw";
  const isMarkerLeft = markerPosition === "left";
  const isExpandUp = expandDirection === "up";

  return (
    <div
      className={cn("fire-callout group absolute h-0 w-0 hover:z-40", className)}
      data-enter-from={enterFrom}
      data-start={range[0]}
      data-end={range[1]}
      style={{ opacity: 0, transform: `translateX(${offset})` }}
    >
      <div
        className={cn(
          "absolute flex w-[300px] flex-col rounded-[6px] bg-[#24211f]/95 text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 max-md:w-[235px]",
          isExpandUp ? "bottom-0" : "top-0",
          isMarkerLeft ? "left-0" : "right-0",
        )}
      >
        <div
          className={cn(
            "absolute h-3 w-3 rotate-45 bg-[#24211f]/95",
            isExpandUp ? "bottom-1.5" : "top-1.5",
            isMarkerLeft ? "-left-1.5" : "-right-1.5",
          )}
          aria-hidden="true"
        />

        <div
          className={cn(
            "absolute z-20 flex h-12 w-12 items-center justify-center",
            isExpandUp ? "-bottom-6" : "-top-6",
            isMarkerLeft ? "-left-6" : "-right-6",
          )}
        >
          <motion.div
            className="absolute inset-[-4px] rounded-full bg-[#F55656]/20 blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border-[2.5px] border-white/80"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 1,
                ease: "easeOut",
              }}
            />
          ))}

          <motion.div
            className="relative z-10 h-6 w-6 rounded-full border-[3.5px] border-white bg-[#F55656] shadow-[0_0_12px_rgba(245,86,86,0.5),0_0_24px_rgba(245,86,86,0.2)] max-md:h-7 max-md:w-7 max-md:border-[3px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="px-5 py-5">
          <h3 className="font-heading font-figtree uppercase leading-none text-white">
            {label}
          </h3>
        </div>

        <div className="grid grid-rows-[0fr] font-figtree font-[400] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="space-y-5 pb-6 pt-5 text-body leading-tight">
              <CalloutStat label="Scale:" value={stats.scale} />
              <CalloutDivider />
              <CalloutStat label="Delay:" value={stats.delay} />
              <CalloutDivider />
              <CalloutStat label="Impact:" value={stats.impact} />
              {doesHaveAsterisk ? (
                <div className="grid grid-cols-[4fr_1fr] gap-3 px-5">
                  <span className="text-xs text-white/55">
                    {doesHaveAsterisk}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalloutStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-3 px-5">
      <span className="font-bold text-cta">{label}</span>
      <span className="text-white/85">{value}</span>
    </div>
  );
}

function CalloutDivider() {
  return (
    <div className="h-px w-full origin-left scale-x-0 bg-white/15 transition-transform duration-300 group-hover:scale-x-100" />
  );
}
