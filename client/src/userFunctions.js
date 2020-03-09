import axios from 'axios'


export const register = newUser => {
    return axios
    .post('users/api/register', {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email
    })
    .then(response => {
        console.log("Registered!");
    })
}

export const login = (user) => {
    return axios
    .post('users/api/login', {
        password: user.password,
        email: user.email,
    })
    .then(response => {
        if(response.data.length>5) {
            localStorage.setItem('usertoken', response.data);
            window.location = '/';
        }
        return response.data;
    })
    .catch(err => {
        console.log(err);
    })
}