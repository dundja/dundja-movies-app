import axios from "axios";

export default axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3"
});
