export type FireStatValue =
  | string
  | Array<{
      text: string;
      className?: string;
    }>;

export interface FireCalloutProps {
  label: string;
  image: string;
  coordinates: [number, number];
  stats: {
    scale: FireStatValue;
    delay: FireStatValue;
    impact: FireStatValue;
  };
  className: string;
  enterFrom: "left" | "right";
  range: [number, number];
  markerPosition?: "left" | "right";
  mobileLabel?: string;
  mobileCardPosition?: "left" | "right";
  mobileExpandDirection?: "up" | "down";
  defaultOpenOnMobile?: boolean;
  expandDirection?: "up" | "down";
  doesHaveAsterisk?: string;
  sourceUrl?: string;
  sourceName?: string;
}
