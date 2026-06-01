import { motion } from "framer-motion";
import { useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { Button } from "@/components/common/Button";

const posts = [
  {
    date: "December 2, 2025",
    title: (
      <>
        Before
        <br />
        We Build,
        <br />
        <span className="text-[#F15D59]">We Listen</span>
      </>
    ),
    body: "We spoke with firefighters across the U.S. to understand what early wildfire detection looks like on the ground, not in a lab. The reality: fires are still reported via 911, wrong locations waste critical time, and specialized tools barely exist. That's the problem we're designing for.",
    image: "/images/blog-before-we-build.png",
  },
  {
    date: "January 2, 2026",
    title: (
      <>
        Building
        <br />
        Nature's
        <br />
        <span className="text-[#F15D59]">Sixth Sense</span>
      </>
    ),
    body: "Building smart nodes detect wildfire chemistry in real time, filter false alarms on-device, and when multiple nodes agree, a camera activates, and a vision model analyzes smoke, wind, and spread, giving first responders actionable intelligence before the fire spreads.",
    image: "/images/blog-sixth-sense.png",
  },
] as const;

function RedArrow({
  direction = "right",
  size = { x: 20, y: 20 },
  className,
}: {
  direction?: "left" | "right";
  size?: { x: number; y: number };
  className?: string;
}) {
  const sideStyle =
    direction === "right"
      ? { borderLeftWidth: size.x, borderLeftColor: "#F15D59" }
      : { borderRightWidth: size.x, borderRightColor: "#F15D59" };

  return (
    <span
      aria-hidden="true"
      className={`block h-0 w-0 border-y-transparent${className ? ` ${className}` : ""}`}
      style={{ borderTopWidth: size.y, borderBottomWidth: size.y, ...sideStyle }}
    />
  );
}

export default function Blog() {
  const { sectionRef, sectionHeight, trackWidth, trackX, slideWidth } =
    useHorizontalScroll({
      slideCount: posts.length,
    });

  return (
    <PageLayout headerClassName="header-dark">
      {/* ── Desktop ── */}
      <section
        ref={sectionRef}
        className="relative bg-[#F7F7F7] max-md:hidden"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F7] pt-24 max-md:pt-28">
          <div className="flex items-center gap-3 px-[50px] max-md:px-5">
            <span className="shrink-0 font-body font-[400] text-body-lg uppercase tracking-[0.14em] text-bg-dark">
              Blogs
            </span>
            <span className="h-px flex-1 bg-bg-dark" />
          </div>

          <motion.div
            className="mt-20 flex h-[calc(100%-11rem)] max-md:mt-12 max-md:h-[calc(100%-6.5rem)]"
            style={{ width: trackWidth, x: trackX }}
          >
            {posts.map((post, index) => (
              <article
                key={post.date}
                className="relative box-border grid h-full shrink-0 grid-cols-[1.3fr_1fr] items-center gap-14 px-[50px] max-lg:grid-cols-1 max-lg:content-center max-lg:gap-6 max-md:px-5"
                style={{ width: slideWidth }}
              >
                <div className="absolute left-[50px] bottom-[100px] -translate-y-1/2 max-lg:top-auto max-lg:bottom-4 max-lg:translate-y-0">
                  <RedArrow direction={index === 0 ? "right" : "left"} />
                </div>

                <div className="ml-[100px] max-lg:ml-16 max-md:ml-0">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-[1.39/1] w-full max-w-[910px] object-cover max-md:max-h-[38vh]"
                  />
                </div>

                <div className="max-w-[560px] max-lg:ml-16 max-md:ml-0">
                  <p className="font-figtree text-body-lg font-[400] uppercase tracking-[0.28em] text-[#24242578] max-md:tracking-[0.16em]">
                    {post.date}
                  </p>
                  <h1 className="mt-10 font-body text-h1 font-normal uppercase leading-[1] tracking-normal text-black max-lg:mt-6 max-md:text-[clamp(2.25rem,10vw,3.5rem)]">
                    {post.title}
                  </h1>
                  <p className="mt-10 max-w-[470px] font-figtree text-body-lg font-normal leading-snug text-[#24242578] max-lg:mt-5 max-md:line-clamp-4">
                    {post.body}
                  </p>
                  <Button
                    variant="primary"
                    className="mt-10"
                  >
                    Read More
                  </Button>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mobile ── */}
      <MobileBlogRail />
    </PageLayout>
  );
}

function MobileBlogRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail) return;

    const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    const slots = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-blog-card-slot]"),
    );

    const nearest = slots.reduce(
      (closest, slot, index) => {
        const rect = slot.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - railCenter);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: activeIndex, distance: Number.POSITIVE_INFINITY },
    );

    if (nearest.index !== activeIndex) {
      setActiveIndex(nearest.index);
    }
  };


  return (
    <section
      data-header-class="header-dark"
      className="bg-[#F7F7F7] pb-16 pt-[96px] md:hidden"
    >
      {/* Header — "Blogs" label + line, identical to desktop */}
      <div className="flex items-center gap-14 px-5">
        <span className="shrink-0 font-heading font-[400] text-body uppercase tracking-[0.14em] text-bg-dark">
          Blogs
        </span>
        <span className="h-px flex-1 bg-bg-dark" />
      </div>

      {/* Scrollable rail */}
      <div
        ref={railRef}
        className="mt-10 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        aria-label="Blog posts"
      >
        <div className="flex">
          {posts.map((post, index) => (
            <div key={post.date} data-blog-card-slot className="w-screen shrink-0 snap-center flex justify-center px-5">

              <article className="w-full max-w-[340px]">
                <img
                  src={post.image}
                  alt=""
                  className="aspect-[1.39/1] w-full h-[250px] object-cover"
                />
                <p className="mt-6 pl-6 font-figtree text-[14px] font-[400] uppercase tracking-[0.16em] text-[#24242578]">
                  {post.date}
                </p>
                <div className="mt-6 relative flex items-start gap-0">
                  {index === 0 && <RedArrow className="absolute -left-4" size={{ x: 16, y: 16 }} direction={index === 0 ? "right" : "left"} />}
                  <h2 className="font-body text-[42px] pl-6 font-normal uppercase leading-[0.94] tracking-normal text-black">
                    {post.title}
                  </h2>
                  {index === 1 && <RedArrow className="absolute -right-4" size={{ x: 16, y: 16 }} direction={"left"} />}
                </div>
                <p className="mt-6 pl-6 font-figtree text-[14px] font-normal leading-snug text-[#24242578] line-clamp-4">
                  {post.body}
                </p>
                <Button variant="primary" className="mt-8 ml-6">
                  Read More
                </Button>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dot pagination */}
      <div className="mt-6 flex justify-center gap-3">
        {posts.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-8 transition-colors ${index === activeIndex ? "bg-[#F55656]" : "bg-bg-dark/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
