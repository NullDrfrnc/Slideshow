import type {SlideType} from "./Slide";

export interface PlaylistType {
    id?: string | undefined;
    title?: string;
    description?: string | undefined;
    slides?: SlideType[] | undefined;
}