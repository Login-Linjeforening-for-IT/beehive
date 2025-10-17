import plugin from 'tailwindcss/plugin'

export default plugin(({ matchUtilities }) => {
    matchUtilities({
        glow: (value) => ({
            boxShadow: `
                0 0 1em ${value}80,
                0 0 3em ${value}66,
                inset 0 0 1em ${value}4d,
                inset 0 0 2em ${value}26
            `
        })
    })
})
