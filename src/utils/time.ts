export function isEasterSeason(date: Date = new Date()): boolean {
    const inputYear = date.getFullYear()
    const a = inputYear % 19
    const b = Math.floor(inputYear / 100)
    const c = inputYear % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n = Math.floor((h + l - 7 * m + 114) / 31)
    const p = ((h + l - 7 * m + 114) % 31) + 1

    const easterDate = new Date(inputYear, n - 1, p)
    const easterStart = new Date(easterDate).setDate(easterDate.getDate() - 14)
    const easterEnd = new Date(easterDate).setDate(easterDate.getDate() + 7)

    return date.getTime() >= easterStart && date.getTime() <= easterEnd
}