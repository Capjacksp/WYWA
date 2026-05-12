import { Button } from "@/components/common/Button";

function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden -mt-16">
            {/* Left: Aerial image background (~70%) */}
            <div className="absolute inset-0 w-[70%] max-lg:w-full">
                <img
                    src="/images/home-img.png"
                    alt="Aerial view of forests and farmland"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Geometric line overlays */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                >
                    {/* Horizontal lines */}
                    <line
                        x1="0" y1="50%" x2="3%" y2="50%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="12.5%" x2="3%" y2="12.5%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="25%" x2="3%" y2="25%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="37.5%" x2="100%" y2="37.5%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="62.5%" x2="3%" y2="62.5%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="3%" y1="66%" x2="100%" y2="66%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="75%" x2="3%" y2="75%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="0" y1="87.5%" x2="3%" y2="87.5%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="3%" y1="82.5%" x2="30%" y2="82.5%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />


                    {/* Vertical lines */}


                    <line
                        x1="57%" y1="37.5%" x2="57%" y2="100%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />
                    <line
                        x1="3%" y1="0" x2="3%" y2="100%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />

                    <line
                        x1="30%" y1="66%" x2="30%" y2="100%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />

                    <line
                        x1="16%" y1="66%" x2="16%" y2="100%"
                        stroke="white" strokeWidth="0.15" opacity="1"
                    />

                    {/* semi Circles */}

                    <path
                        d="
    M 70 37.5
    A 9.1 10 0 0 0 70 66
  "
                        fill="none"
                        stroke="white"
                        strokeWidth="0.15"
                        transform="rotate(180 57 51.75)"
                    />
                    <path
                        d="
    M 37.5 100
    A 21 15 0 0 0 0 66
  "
                        fill="none"
                        stroke="white"
                        strokeWidth="0.15"
                        transform="rotate(180 53 83)"
                    />
                </svg>
            </div>

            {/* Right: Dark panel (~30%) */}
            <div
                className="absolute top-0 right-0 w-[30%] max-lg:hidden h-full flex flex-col justify-end p-10 bg-bg-dark"
            >
                <div className="mb-12">
                    <h2 className="font-heading text-h3 text-white leading-vtight" style={{ fontWeight: 300 }}>
                        SYSTEMS THAT
                        <br />
                        DETECT WILDFIRES
                        <br />
                        BEFORE THEY
                        <br />
                        BECOME VISIBLE
                    </h2>

                    <Button variant="primary" className="mt-6">
                        <a href="#book-demo">BOOK A DEMO</a>
                    </Button>
                </div>
            </div>

            {/* Hero heading — positioned over the image */}
            <div className="absolute left-[50px] max-md:left-6 top-[20%] max-lg:top-[40%] z-10">
                <h1 className="font-heading text-h1" style={{ fontWeight: 350 }}>
                    <span className="block text-white">
                        BUILDING NATURE&rsquo;S
                    </span>
                    <span className="block text-cta">
                        SIXTH SENSE
                    </span>
                </h1>
            </div>

            {/* Mobile-only tagline (visible when right panel is hidden) */}
            <div className="hidden max-lg:flex absolute bottom-10 left-6 right-6 z-10">
                <div>
                    <h2 className="text-h2 text-white">
                        SYSTEMS THAT DETECT WILDFIRES
                        <br />
                        BEFORE THEY BECOME VISIBLE
                    </h2>
                    <Button variant="primary" size="sm" className="mt-4">
                        <a href="#book-demo">BOOK A DEMO</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero