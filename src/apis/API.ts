import axios from "axios";

export const API = axios.create({ baseURL: "https://opentdb.com/api.php" });
