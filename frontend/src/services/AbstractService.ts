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

    getAll() {
        return this.baseService.get(`${this.endpoint}`)
            .then((r) =>
                Promise.resolve(r)
            ).catch((err) => {
                console.log(err)
                return undefined;
            });
    }

    getByID(id: string) {
        return this.baseService.get(`${this.endpoint}/${id}`)
            .then((r) =>
                Promise.resolve(r)
            ).catch((err) => {
                console.log(err)
                return undefined;
            });
    }

    create(data: Type) {
        return this.baseService.post(`${this.endpoint}`, data)
            .then((r) =>
                Promise.resolve(r)
            ).catch((err) => {
                console.log(err)
                return undefined;
            });
    }

    update(data: Type) {
        return this.baseService.patch(`${this.endpoint}`, data)
            .then((r) =>
                Promise.resolve(r)
            ).catch((err) => {
                console.log(err)
                return undefined;
            });
    }

    delete(id: string) {
        return this.baseService.delete(`${this.endpoint}/${id}`)
            .then((r) =>
                Promise.resolve(r)
            ).catch((err) => {
                console.log(err)
                return undefined;
            });
    }
}