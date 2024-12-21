// @ts-ignore
import i18n from "i18next"
// @ts-ignore
import {initReactI18next} from "react-i18next"
// @ts-ignore
import Backend from "i18next-http-backend"

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: "nb",
        debug: false,

        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        }
    })

export default i18n
