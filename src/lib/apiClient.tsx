import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
});

export const loginRequest = async (email: string, password: string): Promise<void> => {
    const formData = new FormData();
    formData.set('username', email);
    formData.set('password', password);
    apiClient.post(
        '/users/login',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
};
