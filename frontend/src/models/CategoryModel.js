import Axios from 'axios'

import Config from '../core/Config'

export default class CategoryModel {
    async get() {
        return await Axios.get(Config.api('categories'))
    }

    async find(id) {
        return await Axios.get(Config.api('category/'+id))
    }

    async post(data) {
        return await Axios.post(Config.api('category'), data)
    }

    async put(data) {
        return await Axios.put(Config.api('category'), data)
    }

    async delete(data) {
        return await Axios.delete(Config.api('category'), data)
    }
}