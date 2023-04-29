import axios, { AxiosInstance } from "axios";
import { config } from "../constant";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

const http = new Http().instance;
export default http;
