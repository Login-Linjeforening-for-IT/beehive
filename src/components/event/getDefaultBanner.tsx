import DefaultBedpresBanner from '@components/svg/defaultbanners/DefaultBedpresBanner'
import DefaultCtfBanner from '@components/svg/defaultbanners/DefaultCtfBanner'
import DefaultEventBanner from '@components/svg/defaultbanners/DefaultEventBanner'
import DefaultSocialBanner from '@components/svg/defaultbanners/DefaultSocialBanner'
import DefaultTekkomBanner from '@components/svg/defaultbanners/DefaultTekkomBanner'

export default function getDefaultBanner(category: string, color: string) {
    const className = `event-item_img glow-[${color}]`

    switch (category) {
        case 'Sosialt':
            return <DefaultSocialBanner color={color} className={className} />
        case 'TekKom':
            return <DefaultTekkomBanner color={color} className={className} />
        case 'CTF':
            return <DefaultCtfBanner color={color} className={className} />
        case 'Bedpres':
            return <DefaultBedpresBanner color={color} className={className} />
        default:
            return <DefaultEventBanner color={color} className={className} />
    }
}
