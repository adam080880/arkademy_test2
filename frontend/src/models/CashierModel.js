import Axios from 'axios'

import Config from '../core/Config'

export default class CashierModel {
    async get() {
        return await Axios.get(Config.api('cashiers'))
    }

    async find(id) {
        return await Axios.get(Config.api('cashier/'+id))
    }

    async post(data) {
        return await Axios.post(Config.api('cashier'), data)
    }

    async put(data) {
        return await Axios.put(Config.api('cashier'), data)
    }

    async delete(data) {
        return await Axios.delete(Config.api('cashier'), data)
    }
}