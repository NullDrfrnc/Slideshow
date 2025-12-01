import * as React from "react";
import type {ComponentInfo} from "./Component.d.ts";

export interface SlideType {
    id?: string | undefined;
    title?: string;
    description?: string | undefined;
    style?: React.CSSProperties | undefined;
    components?: ComponentInfo[] | undefined;
}