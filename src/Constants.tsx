const prod = {
    url: {
        API_URL: process.env.REACT_APP_API_URL,
        CDN_URL: "https://cdn.login.no"
    }
}

const dev = {
    url: {
        API_URL: "https://testapi.login.no/api", // ntnu network necessary, use vpn
        CDN_URL: "https://cdn.login.no"
    }
}

//prod.url.API_URL = process.env.REACT_APP_API_URL

export const config = process.env.NODE_ENV === "development" ? dev : prod
