import config from "../config";

export function generateCSSVariables(): string {
  return `
    :root {
      --color-primary: ${config.primaryColor};
      --color-secondary: ${config.secondaryColor};
      --color-primary-dark: ${darken(config.primaryColor, 15)};
      --color-primary-light: ${lighten(config.primaryColor, 40)};
      --color-text: #111827;
      --color-text-muted: #6b7280;
      --color-background: #ffffff;
      --color-surface: #f9fafb;
      --color-border: #e5e7eb;
      --font-family: ${config.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --radius: 8px;
      --radius-lg: 16px;
      --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  `;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace("#", "").padEnd(6, "0"));
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.max(0, rgb.r - amount);
  const g = Math.max(0, rgb.g - amount);
  const b = Math.max(0, rgb.b - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, rgb.r + amount);
  const g = Math.min(255, rgb.g + amount);
  const b = Math.min(255, rgb.b + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export const theme = {
  primary: config.primaryColor,
  secondary: config.secondaryColor,
  font: config.fontFamily,
};
