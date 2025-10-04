import {AbstractService} from "@/services/AbstractService.ts";
import type {Slide} from "../../@types/slide";
import type {ComponentInfo} from "@/domain/Component.ts";

export class SlideService extends AbstractService<Slide> {
    static instance: SlideService | undefined = undefined;

    constructor() {
        super("slide");
    }

    static get getInstance() {
        if (!SlideService.instance)
            SlideService.instance = new SlideService()
        return SlideService.instance;
    }

    async getAll() {
        return super.getAll().then((r) => {
            if (r)
                r.data?.forEach((item: Slide) => {
                    item.components?.forEach((componentInfo: ComponentInfo) => {
                        componentInfo.tempID = componentInfo.id;
                    })
                })
            return r;
        });
    }

    async getByID(id: string) {
        return super.getByID(id).then((r) => {
            if (r)
                (r.data as Slide).components?.forEach((componentInfo: ComponentInfo) => {
                    componentInfo.tempID = componentInfo.id;
                })
            return r;
        });
    }
}