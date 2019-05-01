import axios from 'axios';

export default {
    getUserDashData: (userId, locationPhone) => {
        return axios.post('/dashboard', { userId, locationPhone });
    }
}

