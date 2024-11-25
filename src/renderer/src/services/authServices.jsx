import axios from "axios";

export const authServices = {
    register: (body) => {
        return new Promise((resolve, reject) => {
            axios.post(`auth/loginEmail`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    loginByEmail: (body) => {
        return new Promise((resolve, reject) => {
            axios.post(`auth/loginEmail`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    loginByIdentification: (body) => {
        return new Promise((resolve, reject) => {
            axios.post(`auth/loginIdentification`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    loginByToken: (token) => {
        return new Promise((resolve, reject) => {
            axios.get(`auth/getUserAutheticated`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

    logoutByToken: () => {
        return new Promise((resolve, reject) => {
            axios.get(`auth/logout`)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
};
