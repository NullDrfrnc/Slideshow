import axios, {type AxiosInstance} from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const abstractService = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export abstract class AbstractService<Type> {
    protected readonly baseService: AxiosInstance;
    protected readonly endpoint: string;

    protected constructor(endpoint: string) {
        this.baseService = abstractService;
        this.endpoint = endpoint;
    }

    async getAll() {
        try {
            return await this.baseService.get(`${this.endpoint}`);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async getByID(id: string) {
        try {
            return await this.baseService.get(`${this.endpoint}/${id}`);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async create(data: Type) {
        try {
            return await this.baseService.post(`${this.endpoint}`, data);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async update(data: Type) {
        try {
            return await this.baseService.patch(`${this.endpoint}`, data);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async delete(id: string) {
        try {
            return await this.baseService.delete(`${this.endpoint}/${id}`);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}