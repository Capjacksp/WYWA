import { type MutableRefObject, useLayoutEffect, useRef } from "react";
import { wildfireCallouts } from "@/features/home/data/wildfireCallouts";

const SCRAMBLE_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-<>";

function animateCardText(card: HTMLElement) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = card.querySelectorAll<HTMLElement>("[data-animate-text]");

  elements.forEach((element, elementIndex) => {
    const text = element.dataset.animateText ?? element.textContent ?? "";
    if (reduceMotion) {
      element.textContent = text;
      return;
    }

    const startedAt = performance.now() + elementIndex * 70;
    const duration = Math.max(320, text.length * 32);

    const update = (now: number) => {
      if (now < startedAt) {
        requestAnimationFrame(update);
        return;
      }

      const progress = Math.min(1, (now - startedAt) / duration);
      const resolvedCount = Math.floor(progress * text.length);
      element.textContent = Array.from(text)
        .map((character, index) => {
          if (character === " " || index < resolvedCount) return character;
          return SCRAMBLE_SYMBOLS[Math.floor(Math.random() * SCRAMBLE_SYMBOLS.length)];
        })
        .join("");

      if (progress < 1) requestAnimationFrame(update);
      else element.textContent = text;
    };

    requestAnimationFrame(update);
  });
}

export function LeafletWildfireMap({
  locationsLayerRef,
  mapRef,
}: {
  locationsLayerRef: MutableRefObject<HTMLDivElement | null>;
  mapRef?: MutableRefObject<any | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const leaflet = (window as typeof window & { L?: any }).L;
    if (!container || !leaflet) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const map = leaflet.map(container, {
      center: [37.2, -100.7],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      scrollWheelZoom: false,
      zoomControl: false,
      worldCopyJump: true,
      dragging: !isMobile,
      touchZoom: !isMobile,
      doubleClickZoom: !isMobile,
      boxZoom: !isMobile,
      keyboard: !isMobile,
    });
    if (mapRef) mapRef.current = map;

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      })
      .addTo(map);

    leaflet.control.zoom({ position: "bottomleft" }).addTo(map);
    container
      .querySelector<HTMLElement>(".leaflet-control-zoom")
      ?.classList.add("wywa-map-reveal-control");

    const locationsPane = map.createPane("wywaLocations");
    locationsPane.style.zIndex = "600";
    locationsLayerRef.current = locationsPane;

    const labelsPane = map.createPane("wywaLabels", locationsPane);
    labelsPane.style.zIndex = "650";

    const incidentBounds = leaflet.latLngBounds(
      wildfireCallouts.map((fire) => fire.coordinates),
    );
    map.fitBounds(incidentBounds, {
      padding: isMobile ? [45, 90] : [110, 110],
      maxZoom: isMobile ? 5 : 6,
    });

    wildfireCallouts.forEach((fire, index) => {
      const labelDirection = isMobile
        ? fire.mobileCardPosition ?? "auto"
        : fire.markerPosition === "left"
          ? "right"
          : "left";
      const expandsUp = fire.expandDirection === "up";
      const marker = leaflet.marker(fire.coordinates, {
        title: fire.label,
        alt: fire.label,
        pane: "wywaLocations",
        icon: leaflet.divIcon({
          className: `wywa-fire-marker wywa-location-${index}`,
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
                <div><dt data-animate-text="Scale:">Scale:</dt><dd data-animate-text="${fire.stats.scale}">${fire.stats.scale}</dd></div>
                <div><dt data-animate-text="Delay:">Delay:</dt><dd data-animate-text="${fire.stats.delay}">${fire.stats.delay}</dd></div>
                <div><dt data-animate-text="Impact:">Impact:</dt><dd data-animate-text="${fire.stats.impact}">${fire.stats.impact}</dd></div>
              </dl>
              ${fire.doesHaveAsterisk ? `<p data-animate-text="${fire.doesHaveAsterisk}">${fire.doesHaveAsterisk}</p>` : ""}
            </div>
          </div>
        </article>`,
        {
          permanent: true,
          interactive: true,
          direction: labelDirection,
          offset: [labelDirection === "right" ? 20 : labelDirection === "left" ? -20 : 0, 0],
          pane: "wywaLabels",
          className: `wywa-fire-label wywa-location-pop wywa-location-${index}${expandsUp ? " wywa-fire-label--up" : ""}`,
        },
      );

      const getTooltipElement = () => marker.getTooltip()?.getElement();
      let closeTimer = 0;
      const clearActiveLocation = () => {
        locationsPane.classList.remove("has-active-location");
        container
          .querySelectorAll<HTMLElement>(".is-location-dimmed")
          .forEach((element) => element.classList.remove("is-location-dimmed"));
      };

      const openDetails = () => {
        const tooltipElement = getTooltipElement();
        if (!tooltipElement) return;

        window.clearTimeout(closeTimer);
        if (tooltipElement.classList.contains("is-expanded")) return;

        (labelsPane.querySelectorAll(
          ".wywa-fire-label.is-expanded",
        ) as NodeListOf<HTMLElement>)
          .forEach((label) => label.classList.remove("is-expanded"));

        clearActiveLocation();
        tooltipElement.classList.add("is-expanded");
        locationsPane.classList.add("has-active-location");
        container
          .querySelectorAll<HTMLElement>(".wywa-fire-label, .wywa-fire-marker")
          .forEach((element) => {
            if (!element.classList.contains(`wywa-location-${index}`)) {
              element.classList.add("is-location-dimmed");
            }
          });
        animateCardText(tooltipElement);
      };

      const scheduleCloseDetails = () => {
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
          const tooltipElement = getTooltipElement();
          if (
            tooltipElement?.classList.contains("is-expanded") &&
            !tooltipElement.matches(":hover")
          ) {
            tooltipElement.classList.remove("is-expanded");
            clearActiveLocation();
          }
        }, 90);
      };

      marker.on("mouseover", openDetails);
      marker.on("mouseout", scheduleCloseDetails);

      marker.on("tooltipopen", () => {
        const tooltipElement = getTooltipElement();
        if (!tooltipElement || tooltipElement.dataset.clickReady === "true") return;

        tooltipElement.dataset.clickReady = "true";
        tooltipElement.style.setProperty("--wywa-location-index", String(index));
        tooltipElement.setAttribute("role", "button");
        tooltipElement.setAttribute("tabindex", "0");
        tooltipElement.setAttribute("aria-label", `Toggle details for ${fire.label}`);

        tooltipElement.removeAttribute("role");
        tooltipElement.removeAttribute("tabindex");
        tooltipElement.removeAttribute("aria-label");
        tooltipElement.addEventListener("mouseenter", openDetails);
        tooltipElement.addEventListener("mouseleave", scheduleCloseDetails);
      });

      marker.addTo(map);
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      locationsLayerRef.current = null;
      if (mapRef) mapRef.current = null;
      map.remove();
    };
  }, [locationsLayerRef, mapRef]);

  return (
    <div
      ref={containerRef}
      className="wywa-leaflet-map absolute inset-0"
      aria-label="Interactive map of major California wildfires"
    />
  );
}
