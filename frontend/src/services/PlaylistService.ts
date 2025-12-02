import {AbstractService} from "@/services/AbstractService.ts";
import type {PlaylistType} from "../../@types/playlist";

export class PlaylistService extends AbstractService<PlaylistType> {
    static instance: PlaylistService | undefined = undefined;

    constructor() {
        super("/playlist");
    }

    static get getInstance() {
        if (!PlaylistService.instance)
            PlaylistService.instance = new PlaylistService()
        return PlaylistService.instance;
    }
}