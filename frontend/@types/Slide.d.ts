import * as React from "react";
import type {ComponentInfo} from "./Component.d.ts";
import type {PlaylistType} from "./playlist";

export interface SlideType {
    id?: string | undefined;
    title?: string;
    description?: string | undefined;
    style?: React.CSSProperties | undefined;
    components?: ComponentInfo[] | undefined;
    playlists?: PlaylistType[] | undefined;
}