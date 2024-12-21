type RGB = {
    r: number
    g: number
    b: number
}

/**
 * Validates if the input string is a valid hex color.
 * @param hex - The hex color string.
 * @returns True if valid, false otherwise.
 */
export function isValidHex(hex: string) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex)
}

/**
 * Converts RGB values to a hex color string.
 * @param r - The red value (0-255).
 * @param g - The green value (0-255).
 * @param b - The blue value (0-255).
 * @returns The hex color string.
 */
export function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

/**
 * Converts a hex color to an RGB color.
 * @param hex - The hex color string.
 * @returns The RGB representation of the color.
 */
export function hexToRgb(hex: string): RGB {
    if (!isValidHex(hex)) return {r: 0, g: 0, b: 0}

    let r = 0, g = 0, b = 0
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16)
        g = parseInt(hex[2] + hex[2], 16)
        b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16)
        g = parseInt(hex[3] + hex[4], 16)
        b = parseInt(hex[5] + hex[6], 16)
    }

    return { r, g, b }
}

/**
 * Converts a hex color to an RGBA color with the specified transparency.
 * @param hex - The hex color string.
 * @param alpha - The alpha value for transparency (between 0 and 1).
 * @returns The RGBA color string.
 */
export function hexToRgba(hex: string, alpha: number) {
  if (!isValidHex(hex)) return null

  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Adjusts the brightness of an RGB color.
 * @param rgb - The RGB color object.
 * @param percent - The percentage to adjust the brightness (negative to darken, positive to lighten).
 * @returns The adjusted RGB color.
 */
export function adjustBrightnessRGB(rgb: RGB, percent: number) {
    let r = Math.min(255, Math.max(0, Math.round(rgb.r + (rgb.r * percent))))
    let g = Math.min(255, Math.max(0, Math.round(rgb.g + (rgb.g * percent))))
    let b = Math.min(255, Math.max(0, Math.round(rgb.b + (rgb.b * percent))))
    return { r, g, b }
}

/**
 * Adjusts the brightness of a hex color.
 * @param hex - The hex color string.
 * @param percent - The percentage to adjust the brightness (negative to darken, positive to lighten).
 * @returns The adjusted hex color.
 */
export function adjustBrightnessHex(hex: string, percent: number) {
    if (!isValidHex(hex)) {
      console.error("Invalid hex color input")
      return null
    }

    let rgb = hexToRgb(hex)
    let adjustedRgb = adjustBrightnessRGB(rgb, percent)
    return rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b)
}

/**
 * Creates a linear gradient from a given hex color with optional opacity.
 * @param color - The hex color string.
 * @param opacity - The opacity value for the gradient (between 0 and 1).
 * @returns The CSS linear gradient string.
 */
export function createGradient(color: string, opacity = 1) {
  if (!isValidHex(color)) {
    console.error("Invalid color input")
    
    // Default gradient with transparency
    return "linear-gradient(120deg,, rgba(204,204,204,0.8), rgba(170,170,170,0.8), rgba(136,136,136,0.8))"
  }

  let rgb = hexToRgb(color)

  // 50% lighter
  let lighterRgb = adjustBrightnessRGB(rgb, 0.5)

  // 30% darker
  let darkerRgb = adjustBrightnessRGB(rgb, -0.3)

  return `linear-gradient(120deg, rgba(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b}, ${opacity}), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity}), rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, ${opacity}))`
}
