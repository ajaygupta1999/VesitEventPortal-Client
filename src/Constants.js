
const dev = {
    Api : {
        API_URL : "http://localhost:8000"
    }
}

const prod = {
    Api : {
        API_URL : "https://vesitevents-backend-cugppvci4q-el.a.run.app"
    }
}


export const config = process.env.NODE_ENV === 'development' ? dev : prod;