import Axios from 'axios'

import Config from '../core/Config'

export default class ProductModel {
    async get() {
        return await Axios.get(Config.api('products'))
    }

    async find(id) {
        return await Axios.get(Config.api('product/'+id))
    }

    async post(data) {
        return await Axios.post(Config.api('product'), data)
    }

    async put(data) {
        return await Axios.put(Config.api('product'), data)
    }

    async delete(data) {
        return await Axios.delete(Config.api('product/'+data.id))
    }
}