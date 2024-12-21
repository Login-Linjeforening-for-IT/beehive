import {config} from "../Constants"

export function getCDNLink(filename: string) {
    if (filename !== 'none') {
        return config.url.CDN_URL + '/img/events/' + filename
    }

    return ''
}
