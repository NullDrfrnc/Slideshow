import * as React from "react";
import type {Slide} from "../../@types/slide.d.ts";

export type TextType = "p" | "h1" | "h2" | "h3"

export abstract class Component {
    type?: string;
    id?: string;
    slide?: Slide;
    style?: React.CSSProperties;
}

export class TextComponent extends Component {
    textType?: TextType;
    text?: string;
}

export class ImageComponent extends Component {
    alt?: string;
    url?: string;
}

export class VideoComponent extends Component {
    url?: string;
}
