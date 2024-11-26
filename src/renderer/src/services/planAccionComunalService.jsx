import axios from "axios";

export const planAccionComunalService = {
    store: (body) => {
        return new Promise((resolve, reject) => {
            axios.post(`planAccionComunal/store`, body)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
};
