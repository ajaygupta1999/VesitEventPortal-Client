
const dev = {
    Api : {
        API_URL : "http://localhost:8000"
    }
}

const prod = {
    Api : {
        API_URL : "https://vesit-events-portal.herokuapp.com"
    }
}


export const config = process.env.NODE_ENV === 'development' ? dev : prod;