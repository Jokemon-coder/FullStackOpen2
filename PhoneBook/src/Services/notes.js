import axios from "axios";

const baseUrl = "http://localhost:3000/persons";

const GetAll = () => {
    const req = axios.get(baseUrl);
    return req.then((response) => {
        return response.data;
    })
}

const AddContact = (contact) => {
    return axios.post(baseUrl, contact);
}

const DeleteContact = (contactId) => {
    return axios.delete(`${baseUrl}/${contactId}`);
}

const EditContact = (contactId, data) => {
    return axios.put(`${baseUrl}/${contactId}`, data);
}

export default {GetAll, AddContact, DeleteContact, EditContact};