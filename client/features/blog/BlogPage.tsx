import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { Button } from "@/components/common/Button";
import { ArrowHead } from "@/components/common/ArrowHead";
import { useIsMobile } from "@/hooks/use-mobile";

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


export default function Blog() {
  const isMobile = useIsMobile();

  return isMobile ? (
    <PageLayout headerClassName="header-dark">
      <MobileBlogRail />
    </PageLayout>
  ) : (
    <DesktopBlog />
  );
}

function DesktopBlog() {
  const { sectionRef, sectionHeight, trackWidth, trackX, slideWidth, scrollYProgress } =
    useHorizontalScroll({
      slideCount: posts.length,
    });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const indicatorWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const scrollToPost = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollDistance = section.offsetHeight - window.innerHeight;
    const progress = posts.length > 1 ? index / (posts.length - 1) : 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop + scrollDistance * progress,
      behavior: "smooth",
    });
  };

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
            <div className="relative h-px flex-1 bg-black/15">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-[#F15D59]"
                style={{ width: indicatorWidth }}
              />
            </div>
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
                <button
                  type="button"
                  className="absolute left-[50px] bottom-[100px] z-10 -translate-y-1/2 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F15D59] max-lg:top-auto max-lg:bottom-4 max-lg:translate-y-0"
                  onClick={() => scrollToPost(index === 0 ? 1 : 0)}
                  aria-label={index === 0 ? "Show next blog post" : "Show previous blog post"}
                >
                  <ArrowHead direction={index === 0 ? "right" : "left"} size={20} />
                </button>

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

    </PageLayout>
  );
}

function MobileBlogRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { stiffness: 200, damping: 30 });
  const indicatorWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const scrollToPost = (index: number) => {
    const rail = railRef.current;
    const slot = rail?.querySelectorAll<HTMLElement>("[data-blog-card-slot]")[
      index
    ];

    if (!rail || !slot) return;

    rail.scrollTo({
      left: slot.offsetLeft + slot.offsetWidth / 2 - rail.clientWidth / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    scrollProgress.set(maxScroll > 0 ? slot.offsetLeft / maxScroll : 0);
  };

  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    scrollProgress.set(maxScroll > 0 ? rail.scrollLeft / maxScroll : 0);

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
      <div className="flex items-center gap-14 px-5">
        <span className="shrink-0 font-heading font-[400] text-body uppercase tracking-[0.14em] text-bg-dark">
          Blogs
        </span>
        <div className="relative h-px flex-1 bg-black/15">
          <motion.div
            className="absolute inset-y-0 left-0 origin-left bg-[#F55656]"
            style={{ width: indicatorWidth }}
          />
        </div>
      </div>

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
                  {index === 0 && (
                    <button
                      type="button"
                      className="absolute -left-4 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656]"
                      onClick={() => scrollToPost(1)}
                      aria-label="Show next blog post"
                    >
                      <ArrowHead size={{ x: 16, y: 16 }} direction="right" />
                    </button>
                  )}
                  <h2 className="font-body text-[42px] pl-6 font-normal uppercase leading-[0.94] tracking-normal text-black">
                    {post.title}
                  </h2>
                  {index === 1 && (
                    <button
                      type="button"
                      className="absolute -right-4 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656]"
                      onClick={() => scrollToPost(0)}
                      aria-label="Show previous blog post"
                    >
                      <ArrowHead size={{ x: 16, y: 16 }} direction="left" />
                    </button>
                  )}
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
