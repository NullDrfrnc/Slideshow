import type {SlideType} from "./Slide.d.ts";
import * as React from "react";

export type TextType = "p" | "h1" | "h2" | "h3"

export interface Component {
    type?: string;
    id?: string;
    slide?: SlideType;
    style?: React.CSSProperties;
    tempID?: string; // TEMPORARY ID THAT WILL NOT PERSIST TO THE DB, ONLY USID IN FRONT-END
}

export interface TextComponent extends Component {
    type?: "text";
    textType?: TextType;
    text?: string;
}

export interface ImageComponent extends Component {
    type?: "image";
    alt?: string;
    url?: string;
}

export interface VideoComponent extends Component {
    type?: "video";
    url?: string;
}

export type ComponentInfo = ImageComponent | TextComponent | VideoComponent;