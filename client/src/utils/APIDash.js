import axios from 'axios';

export default {
    getUserDashData: (userId, locationId) => {
        return axios.post('/dashboard', { userId, locationId });
    }
}

