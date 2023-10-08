import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'

const promise = axios.get("http://localhost:3000/persons").then((result) => {
    result.data.forEach(element => {
        console.log(element);
    });
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
