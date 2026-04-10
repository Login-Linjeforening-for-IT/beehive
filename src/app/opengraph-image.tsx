import { ImageResponse } from 'next/og'

export const alt = 'Login - Linjeforeningen for IT'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

const logoSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><style>.a{fill:#f08640;}.b{fill:#fff;}</style></defs><title>base-white</title><rect class="a" width="40" height="170"/><rect class="a" x="65" y="-65" width="40" height="170" transform="translate(105 -65) rotate(90)"/><rect class="a" x="495" y="-65" width="40" height="170" transform="translate(535 -495) rotate(90)"/><rect class="a" x="560" width="40" height="170" transform="translate(1160 170) rotate(180)"/><rect class="a" x="65" y="495" width="40" height="170" transform="translate(-495 665) rotate(-90)"/><rect class="a" y="430" width="40" height="170"/><rect class="a" x="560" y="430" width="40" height="170" transform="translate(1160 1030) rotate(180)"/><rect class="a" x="495" y="495" width="40" height="170" transform="translate(-65 1095) rotate(-90)"/><rect class="b" x="190" y="110" width="70" height="380"/><rect class="b" x="190" y="420" width="220" height="70"/></svg>'
const logoDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: 'center',
                    background: 'radial-gradient(circle at 20% 20%, #2a2a2a 0%, #171717 55%, #0f0f0f 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    padding: '72px',
                    width: '100%',
                }}
            >
                <img
                    src={logoDataUri}
                    alt='Login Logo'
                    width={340}
                    height={340}
                    style={{
                        marginBottom: 26,
                    }}
                />
                <div
                    style={{
                        color: '#ffffff',
                        fontSize: 46,
                        fontWeight: 700,
                        letterSpacing: 2,
                        textAlign: 'center',
                    }}
                >
                    LOGIN
                </div>
            </div>
        ),
        {
            ...size,
        },
    )
}
