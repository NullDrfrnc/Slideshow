import * as React from "react";
import {Component} from "./component"

export interface Slide {
    id?: string | undefined;
    title: string;
    description?: string | undefined;
    style?: React.CSSProperties | undefined;
    components?: Component[] | undefined;
}