/**
 * Validates if the input string is a valid hex color.
 * @param {string} hex - The hex color string.
 * @returns {boolean} True if valid, false otherwise.
 */
export function isValidHex(hex) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

/**
 * Converts RGB values to a hex color string.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {string} The hex color string.
 */
export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

/**
 * Converts a hex color to an RGB color.
 * @param {string} hex - The hex color string.
 * @returns {object} The RGB representation of the color.
 */
export function hexToRgb(hex) {
  if (!isValidHex(hex)) return null;

  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return { r, g, b };
}

/**
 * Converts a hex color to an RGBA color with the specified transparency.
 * @param {string} hex - The hex color string.
 * @param {number} alpha - The alpha value for transparency (between 0 and 1).
 * @returns {string} The RGBA color string.
 */
export function hexToRgba(hex, alpha) {
  if (!isValidHex(hex)) return null;

  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Adjusts the brightness of an RGB color.
 * @param {object} rgb - The RGB color object.
 * @param {number} percent - The percentage to adjust the brightness (negative to darken, positive to lighten).
 * @returns {object} The adjusted RGB color.
 */
export function adjustBrightnessRGB(rgb, percent) {
  let r = Math.min(255, Math.max(0, Math.round(rgb.r + (rgb.r * percent))));
  let g = Math.min(255, Math.max(0, Math.round(rgb.g + (rgb.g * percent))));
  let b = Math.min(255, Math.max(0, Math.round(rgb.b + (rgb.b * percent))));
  return { r, g, b };
}

/**
 * Adjusts the brightness of a hex color.
 * @param {string} hex - The hex color string.
 * @param {number} percent - The percentage to adjust the brightness (negative to darken, positive to lighten).
 * @returns {string} The adjusted hex color.
 */
export function adjustBrightnessHex(hex, percent) {
  if (!isValidHex(hex)) {
    console.error("Invalid hex color input");
    return null;
  }

  let rgb = hexToRgb(hex);
  let adjustedRgb = adjustBrightnessRGB(rgb, percent);
  return rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
}

/**
 * Creates a linear gradient from a given hex color with optional opacity.
 * @param {string} color - The hex color string.
 * @param {number} opacity - The opacity value for the gradient (between 0 and 1).
 * @returns {string} The CSS linear gradient string.
 */
export function createGradient(color, opacity = 1) {
  if (!isValidHex(color)) {
    console.error("Invalid color input");
    return "linear-gradient(120deg,, rgba(204,204,204,0.8), rgba(170,170,170,0.8), rgba(136,136,136,0.8))"; // Default gradient with transparency
  }

  let rgb = hexToRgb(color);
  let lighterRgb = adjustBrightnessRGB(rgb, 0.5); // 40% lighter
  let darkerRgb = adjustBrightnessRGB(rgb, -0.3); // 20% darker
  let lighterHex = rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b);
  let darkerHex = rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b);

  return `linear-gradient(120deg, rgba(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b}, ${opacity}), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity}), rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, ${opacity}))`;
}
