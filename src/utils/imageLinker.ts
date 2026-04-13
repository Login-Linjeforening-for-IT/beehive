import config from '@config'

export function getCDNLink(filename: string) {
    if (filename !== 'none') {
        return `${config.url.cdn}/img/events/${filename}`
    }

    return ''
}
