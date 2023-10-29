import axios from "axios"

const GetCountries = (url) => {
    return axios.get(url);
}

const GetGeoLocation = (url) => {
    return axios.get(url);
}

const GetWeather = (url) => {
    return axios.get(url);
}

export default {GetCountries, GetGeoLocation, GetWeather};
 