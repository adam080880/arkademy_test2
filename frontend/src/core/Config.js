
const Config = {
    urlApi: "http://localhost:8000/api/",
    api: function(uri) {
        return this.urlApi + uri
    }
}

export default Config

