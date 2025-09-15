import {AbstractService} from "@/services/AbstractService.ts";
import type {Slide} from "../../@types/slide";

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
}