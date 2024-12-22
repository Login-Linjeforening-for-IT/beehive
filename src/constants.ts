const prod = {
    url: {
        API_URL: process.env.REACT_APP_API_URL,
        CDN_URL: "https://cdn.login.no"
    }
}

const dev = {
    url: {
        // ntnu network necessary, use vpn
        API_URL: "https://testapi.login.no/api",
        CDN_URL: "https://cdn.login.no"
    }
}

// prod.url.API_URL = process.env.REACT_APP_API_URL

const config = process.env.NODE_ENV === "development" ? dev : prod

export default config
