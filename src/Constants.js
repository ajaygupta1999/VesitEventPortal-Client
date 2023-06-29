
const dev = {
    Api : {
        API_URL : "http://localhost:8081"
    }
}

const prod = {
    Api : {
        API_URL : "https://vesiteventportal-server-cugppvci4q-uc.a.run.app"
    }
}


export const config = process.env.NODE_ENV === 'development' ? dev : prod;