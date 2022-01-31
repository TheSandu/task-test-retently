import axios from 'axios';

axios.defaults.headers.common = {
    "Content-Type": "application/json",
};

export default class ThumbnailControllerProxy {
    async getThumbnail({ domainName }) {
        try {
            let response = await axios.post("http://localhost:5001/thumbnail/getThumbnail", {
                domainName: domainName,
            });

            if (!response)
                return false;

            return response;
        } catch (error) {
            return error;
        }
    }
}