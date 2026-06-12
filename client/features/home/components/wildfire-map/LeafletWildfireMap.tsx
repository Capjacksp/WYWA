import { type MutableRefObject, useLayoutEffect, useRef } from "react";
import { wildfireCallouts } from "@/features/home/data/wildfireCallouts";

export function LeafletWildfireMap({
  locationsLayerRef,
}: {
  locationsLayerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const leaflet = (window as typeof window & { L?: any }).L;
    if (!container || !leaflet) return;

    const map = leaflet.map(container, {
      center: [37.2, -100.7],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      scrollWheelZoom: false,
      zoomControl: false,
      worldCopyJump: true,
    });

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      })
      .addTo(map);

    leaflet.control.zoom({ position: "bottomleft" }).addTo(map);

    const locationsPane = map.createPane("wywaLocations");
    locationsPane.style.zIndex = "600";
    locationsLayerRef.current = locationsPane;

    const incidentBounds = leaflet.latLngBounds(
      wildfireCallouts.map((fire) => fire.coordinates),
    );
    map.fitBounds(incidentBounds, { padding: [110, 110], maxZoom: 6 });

    wildfireCallouts.forEach((fire, index) => {
      const labelDirection = fire.markerPosition === "left" ? "right" : "left";
      const expandsUp = fire.expandDirection === "up";
      const marker = leaflet.marker(fire.coordinates, {
        title: fire.label,
        alt: fire.label,
        pane: "wywaLocations",
        icon: leaflet.divIcon({
          className: "wywa-fire-marker",
          html: `<span class="wywa-fire-marker__content" style="--wywa-location-index:${index}"><span class="wywa-fire-marker__pulse"></span><span class="wywa-fire-marker__core"></span></span>`,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
          popupAnchor: [0, -22],
        }),
      });

      marker.bindTooltip(
        `<article class="wywa-fire-label__card">
          <h3>${fire.label}</h3>
          <div class="wywa-fire-label__details">
            <div class="wywa-fire-label__details-inner">
              <dl>
                <div><dt>Scale:</dt><dd>${fire.stats.scale}</dd></div>
                <div><dt>Delay:</dt><dd>${fire.stats.delay}</dd></div>
                <div><dt>Impact:</dt><dd>${fire.stats.impact}</dd></div>
              </dl>
              ${fire.doesHaveAsterisk ? `<p>${fire.doesHaveAsterisk}</p>` : ""}
            </div>
          </div>
        </article>`,
        {
          permanent: true,
          interactive: true,
          direction: labelDirection,
          offset: [labelDirection === "right" ? 20 : -20, 0],
          pane: "wywaLocations",
          className: `wywa-fire-label wywa-location-pop${expandsUp ? " wywa-fire-label--up" : ""}`,
        },
      );

      const getTooltipElement = () => marker.getTooltip()?.getElement();
      const toggleDetails = () => {
        getTooltipElement()?.classList.toggle("is-expanded");
      };

      marker.on("mouseover", () => {
        getTooltipElement()?.classList.add("is-marker-hovered");
      });
      marker.on("mouseout", () => {
        getTooltipElement()?.classList.remove("is-marker-hovered");
      });
      marker.on("click", toggleDetails);

      marker.on("tooltipopen", () => {
        const tooltipElement = getTooltipElement();
        if (!tooltipElement || tooltipElement.dataset.clickReady === "true") return;

        tooltipElement.dataset.clickReady = "true";
        tooltipElement.style.setProperty("--wywa-location-index", String(index));
        tooltipElement.setAttribute("role", "button");
        tooltipElement.setAttribute("tabindex", "0");
        tooltipElement.setAttribute("aria-label", `Toggle details for ${fire.label}`);

        tooltipElement.addEventListener("click", toggleDetails);
        tooltipElement.addEventListener("keydown", (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDetails();
          }
        });
      });

      marker.addTo(map);
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      locationsLayerRef.current = null;
      map.remove();
    };
  }, [locationsLayerRef]);

  return (
    <div
      ref={containerRef}
      className="wywa-leaflet-map absolute inset-0"
      aria-label="Interactive map of major California wildfires"
    />
  );
}
