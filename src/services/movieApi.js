import axios from "axios";
 
export const movieApiInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

 