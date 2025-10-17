export default function getGlowStyle(color: string) {
    return {
        boxShadow: `
            0 0 1em ${color}80,
            0 0 3em ${color}66,
            inset 0 0 1em ${color}4d,
            inset 0 0 2em ${color}26
        `,
    } as React.CSSProperties
}
