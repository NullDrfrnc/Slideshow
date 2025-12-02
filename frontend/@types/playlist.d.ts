import type {SlideType} from "./Slide";

export interface PlaylistType {
    id?: string | undefined;
    title?: string;
    slides?: SlideType[] | undefined;
}