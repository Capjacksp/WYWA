import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { useScrollStepNavigation } from "@/hooks/use-scroll-step-navigation";
import { Button } from "@/components/common/Button";
import { ArrowHead } from "@/components/common/ArrowHead";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchBlogPosts, type BlogPost } from "@/data-access/blog-posts";

function getTitleParts(title: string) {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return {
      baseTitle: title,
      highlightedTitle: "",
    };
  }

  return {
    baseTitle: words.slice(0, -2).join(" "),
    highlightedTitle: words.slice(-2).join(" "),
  };
}

function useWordPressBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setStatus("loading");
        const posts = await fetchBlogPosts(controller.signal);
        setBlogPosts(posts);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(error);
        setStatus("error");
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, []);

  return { blogPosts, status };
}

export default function Blog() {
  const isMobile = useIsMobile();
  const { blogPosts, status } = useWordPressBlogPosts();

  return isMobile ? (
    <PageLayout headerClassName="header-dark">
      <MobileBlogRail blogPosts={blogPosts} status={status} />
    </PageLayout>
  ) : (
    <DesktopBlog blogPosts={blogPosts} status={status} />
  );
}

function BlogStatusMessage({
  status,
}: {
  status: "loading" | "success" | "error";
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 text-center font-figtree text-body-lg text-[#24242578]">
      {status === "loading" && "Loading posts..."}
      {status === "error" && "Unable to load posts right now."}
      {status === "success" && "No posts found."}
    </div>
  );
}

function BlogTitle({
  as: Component = "h1",
  title,
  className,
}: {
  as?: "h1" | "h2";
  title: string;
  className: string;
}) {
  const { baseTitle, highlightedTitle } = getTitleParts(title);

  return (
    <Component className={className}>
      {baseTitle}
      {highlightedTitle && (
        <>
          {" "}
          <span className="text-[#F15D59]">{highlightedTitle}</span>
        </>
      )}
    </Component>
  );
}

function DesktopBlog({
  blogPosts,
  status,
}: {
  blogPosts: BlogPost[];
  status: "loading" | "success" | "error";
}) {
  const {
    sectionRef,
    sectionHeight,
    trackWidth,
    trackX,
    slideWidth,
    scrollYProgress,
  } = useHorizontalScroll({
    slideCount: blogPosts.length,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });
  const indicatorWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const {
    activeIndex,
    hasMultipleItems: hasMultiplePosts,
    isFirstItem: isFirstPost,
    isLastItem: isLastPost,
    scrollToIndex: scrollToPost,
  } = useScrollStepNavigation({
    itemCount: blogPosts.length,
    sectionRef,
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
            <div className="relative h-px flex-1 bg-black/15">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-[#F15D59]"
                style={{ width: indicatorWidth }}
              />
            </div>
          </div>
          <div className="relative">
            {blogPosts.length === 0 ? (
              <BlogStatusMessage status={status} />
            ) : (
              <>
                {hasMultiplePosts && (
                  <div className="absolute left-[50px] top-[-50px] z-20 flex items-center gap-8 max-lg:left-8 max-md:left-5">
                    <button
                      type="button"
                      className="border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242425] disabled:cursor-default"
                      onClick={() => scrollToPost(activeIndex - 1)}
                      aria-label={
                        activeIndex === 1
                          ? "Show first blog post"
                          : "Show previous blog post"
                      }
                      disabled={isFirstPost}
                    >
                      <ArrowHead
                        direction="left"
                        size={16}
                        color={isFirstPost ? "#D5D5D5" : "#242425"}
                      />
                    </button>
                    <button
                      type="button"
                      className="border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242425] disabled:cursor-default"
                      onClick={() => scrollToPost(activeIndex + 1)}
                      aria-label={
                        activeIndex === blogPosts.length - 2
                          ? "Show last blog post"
                          : "Show next blog post"
                      }
                      disabled={isLastPost}
                    >
                      <ArrowHead
                        direction="right"
                        size={16}
                        color={isLastPost ? "#D5D5D5" : "#242425"}
                      />
                    </button>
                  </div>
                )}

                <motion.div
                  className="mt-20 flex h-[calc(100%-11rem)] max-md:mt-12 max-md:h-[calc(100%-6.5rem)]"
                  style={{ width: trackWidth, x: trackX }}
                >
                  {blogPosts.map((post) => (
                    <article
                      key={post.id}
                      className="relative box-border grid h-full shrink-0 grid-cols-[1.3fr_1fr] items-center gap-14 px-[50px] max-lg:grid-cols-1 max-lg:content-center max-lg:gap-6 max-md:px-5"
                      style={{ width: slideWidth }}
                    >
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
                        <BlogTitle
                          title={post.title}
                          className="mt-10 w-[520px] max-w-full font-body text-h1 font-normal uppercase leading-[1] tracking-normal text-black max-lg:mt-6 max-md:text-[clamp(2.25rem,10vw,3.5rem)]"
                        />
                        <p className="mt-10 max-w-[470px] font-figtree text-body-lg font-normal leading-snug text-[#24242578] max-lg:mt-5 max-md:line-clamp-4">
                          {post.body}
                        </p>
                        <Button asChild variant="primary" className="mt-10">
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Read More
                          </a>
                        </Button>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function MobileBlogRail({
  blogPosts,
  status,
}: {
  blogPosts: BlogPost[];
  status: "loading" | "success" | "error";
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 200,
    damping: 30,
  });
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

      {blogPosts.length === 0 ? (
        <BlogStatusMessage status={status} />
      ) : (
        <>
          <div
            ref={railRef}
            className="mt-10 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={handleScroll}
            aria-label="Blog posts"
          >
            <div className="flex">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  data-blog-card-slot
                  className="w-screen shrink-0 snap-center flex justify-center px-5"
                >
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
                      {blogPosts.length > 1 &&
                        index !== blogPosts.length - 1 && (
                          <button
                            type="button"
                            className="absolute -left-4 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656]"
                            onClick={() => scrollToPost(index + 1)}
                            aria-label="Show next blog post"
                          >
                            <ArrowHead
                              size={{ x: 16, y: 16 }}
                              direction="right"
                            />
                          </button>
                        )}
                      <BlogTitle
                        as="h2"
                        title={post.title}
                        className="w-[290px] max-w-[calc(100%-2rem)] break-words pl-6 font-body text-[clamp(2rem,11vw,2.625rem)] font-normal uppercase leading-[0.94] tracking-normal text-black [overflow-wrap:anywhere]"
                      />
                      {blogPosts.length > 1 && index !== 0 && (
                        <button
                          type="button"
                          className="absolute -right-4 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656]"
                          onClick={() => scrollToPost(index - 1)}
                          aria-label="Show previous blog post"
                        >
                          <ArrowHead size={{ x: 16, y: 16 }} direction="left" />
                        </button>
                      )}
                    </div>
                    <p className="mt-6 max-w-[calc(100%-1.5rem)] break-words pl-6 font-figtree text-[14px] font-normal leading-snug text-[#24242578] line-clamp-4 [overflow-wrap:anywhere]">
                      {post.body}
                    </p>
                    <Button asChild variant="primary" className="mt-8 ml-6">
                      <a href={post.postUrl} target="_blank" rel="noreferrer">
                        Read More
                      </a>
                    </Button>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {blogPosts.map((post, index) => (
              <span
                key={post.id}
                className={`h-1.5 w-8 transition-colors ${index === activeIndex ? "bg-[#F55656]" : "bg-bg-dark/20"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
