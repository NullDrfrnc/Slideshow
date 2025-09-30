import type {ComponentInfo} from "../domain/Component.ts";
import type {Slide} from "../../@types/slide";
import * as React from "react";

import style from "#/components/Component.module.css"

export interface ComponentProps {
    info: ComponentInfo,
    setter?: (value: Slide) => void | undefined,
}

export const Component = ({info, setter}: ComponentProps) => {
    let content: React.JSX.Element;

    const commonProps = {
        style: info.style,
        className: `${style.component}`,
    };

    switch (info.type) {
        case "image": {
            content = <img alt={info.alt} src={info.url} {...commonProps} />;
            break;
        }
        case "video": {
            content = <video src={info.url} {...commonProps} />;
            break;
        }
        case "text": {
            const Tag = info.textType ?? "p";
            content = <Tag {...commonProps}>{info.text}</Tag>;
            break;
        }
        default:
            content = <p {...commonProps}>Something went wrong!</p>;
    }

    return (
        setter ? (
            <DraggableComponent setter={setter}>
                {content}
            </DraggableComponent>
        ) : (content)
    )
}

export interface DraggableComponentProps {
    children?: React.ReactNode | undefined;
    setter?: (value: Slide) => void,
}

export const DraggableComponent = ({children}: DraggableComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}