export default function getTranslation(useEng: boolean) {
    if (!useEng)
        return (_: boolean, no: boolean) => {
            return no
        }

    return (en: boolean, no: boolean) => {
        return en ? en : no
    }
}
