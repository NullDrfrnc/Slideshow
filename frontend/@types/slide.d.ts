import * as React from "react";
import type {ComponentInfo} from "@/domain/Component.ts";

export interface Slide {
    id?: string | undefined;
    title?: string;
    description?: string | undefined;
    style?: React.CSSProperties | undefined;
    components?: ComponentInfo[] | undefined;
}