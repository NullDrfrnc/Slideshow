import * as React from "react";

export interface Slide {
    id?: string | undefined;
    title: string;
    description?: string | undefined;
    style?: React.CSSProperties | undefined;
}

export interface SlideComponent {
    id?: string | undefined;
    style?: React.CSSProperties | undefined;
}