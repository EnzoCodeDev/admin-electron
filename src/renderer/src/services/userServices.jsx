import axios from "axios";

export const userServices = {
    paginate: (page) => {
        return new Promise((resolve, reject) => {
            axios.get(`userClient/paginate`, { params: { page: page } })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

    getByUuid: (uuid) => {
        return new Promise((resolve, reject) => {
            axios.get(`userClient/getByUuid/${uuid}`)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

    getBySearchByBar: (search, uuid) => {
        return new Promise((resolve, reject) => {
            axios.get(`userClient/getBySearchByBar`, { params: { search: search, uuid: uuid } })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

    store: (body) => {
        return new Promise((resolve, reject) => {
            axios.post(`userClient/store`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

    update: (body, uuid) => {
        return new Promise((resolve, reject) => {
            axios.put(`userClient/update/${uuid}`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
};
