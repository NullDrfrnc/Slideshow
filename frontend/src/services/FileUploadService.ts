import {AbstractService} from "@/services/AbstractService.ts";
import type {ImageUpload} from "../../@types/ImageUpload.ts";

export class FileUploadService extends AbstractService<ImageUpload> {
    static instance: FileUploadService | undefined = undefined;

    constructor() {
        super("/uploads");
    }

    static get getInstance() {
        if (!FileUploadService.instance)
            FileUploadService.instance = new FileUploadService()
        return FileUploadService.instance;
    }

    async uploadImage(imageUpload: ImageUpload) {
        try {
            return await this.baseService.postForm(`${this.endpoint}`, imageUpload)
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
}