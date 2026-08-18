import { type MutableRefObject, useLayoutEffect, useRef } from "react";
import { wildfireCallouts } from "@/features/home/data/wildfireCallouts";
import type { FireCalloutProps } from "@/features/home/components/wildfire-map/types";

export function LeafletWildfireMap({
  locationsLayerRef,
  mapRef,
  onSelect,
  clearSelectionRef,
}: {
  locationsLayerRef: MutableRefObject<HTMLDivElement | null>;
  mapRef?: MutableRefObject<any | null>;
  onSelect?: (fire: FireCalloutProps | null) => void;
  clearSelectionRef?: MutableRefObject<(() => void) | null>;
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

    const incidentBounds = leaflet.latLngBounds(
      wildfireCallouts.map((fire) => fire.coordinates),
    );
    map.fitBounds(incidentBounds, {
      padding: isMobile ? [45, 90] : [110, 110],
      maxZoom: 6,
    });

    let activeIndex: number | null = null;
    const markers: any[] = [];

    const createMarkerIcon = (index: number) =>
      leaflet.divIcon({
        className: `wywa-fire-marker wywa-location-${index}`,
        html: `<span class="wywa-fire-marker__content" style="--wywa-location-index:${index}"><span class="wywa-fire-marker__pulse"></span><span class="wywa-fire-marker__core"></span></span>`,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
        popupAnchor: [0, -22],
      });

    const setMarkerLabel = (marker: any, fire: (typeof wildfireCallouts)[number], visible: boolean) => {
      const markerElement = marker.getElement?.() as HTMLElement | undefined;
      const content = markerElement?.querySelector<HTMLElement>(
        ".wywa-fire-marker__content",
      );
      if (!content) return;

      const existingLabel = content.querySelector<HTMLElement>(
        ".wywa-fire-marker__label",
      );
      if (visible && !existingLabel) {
        const label = document.createElement("span");
        label.className = "wywa-fire-marker__label";
        label.textContent = fire.label;
        content.append(label);
      } else if (!visible) {
        existingLabel?.remove();
      }
    };

    wildfireCallouts.forEach((fire, index) => {
      const displayLabel = fire.label;
      const marker = leaflet.marker(fire.coordinates, {
        title: displayLabel,
        alt: displayLabel,
        pane: "wywaLocations",
        zIndexOffset: isMobile ? 1000 : 0,
        icon: createMarkerIcon(index),
      });

      marker.on("mouseover", () => setMarkerLabel(marker, fire, true));
      marker.on("mouseout", () => setMarkerLabel(marker, fire, false));

      marker.on("click", () => {
        const nextIndex = activeIndex === index ? null : index;
        activeIndex = nextIndex;

        markers.forEach((item, markerIndex) => {
          const markerElement = item.getElement?.() as HTMLElement | undefined;
          const content = markerElement?.querySelector<HTMLElement>(
            ".wywa-fire-marker__content",
          );
          if (!markerElement || !content) return;

          const isActive = markerIndex === nextIndex;
          markerElement.classList.toggle("is-active", isActive);
          content.classList.toggle("is-active", isActive);
        });

        locationsPane.classList.toggle("has-active-location", nextIndex !== null);
        onSelect?.(nextIndex === null ? null : fire);
      });

      marker.addTo(map);
      markers.push(marker);
    });

    const clearSelection = () => {
      activeIndex = null;
      markers.forEach((marker, markerIndex) => {
        const markerElement = marker.getElement?.() as HTMLElement | undefined;
        const content = markerElement?.querySelector<HTMLElement>(
          ".wywa-fire-marker__content",
        );
        if (!markerElement || !content) return;

        markerElement.classList.remove("is-active");
        content.classList.remove("is-active");
        setMarkerLabel(marker, wildfireCallouts[markerIndex], false);
      });
      locationsPane.classList.remove("has-active-location");
    };

    if (clearSelectionRef) clearSelectionRef.current = clearSelection;

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (clearSelectionRef) clearSelectionRef.current = null;
      locationsLayerRef.current = null;
      if (mapRef) mapRef.current = null;
      map.remove();
    };
  }, [clearSelectionRef, locationsLayerRef, mapRef, onSelect]);

  return (
    <div
      ref={containerRef}
      className="wywa-leaflet-map absolute inset-0"
      aria-label="Interactive map of major California wildfires"
    />
  );
}
