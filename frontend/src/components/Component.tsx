import type {ComponentInfo} from "../domain/Component.ts";
import * as React from "react";

import style from "#/components/Component.module.css"
import {useEffect, useRef} from "react";
import type {Slide} from "../../@types/slide";

export interface ComponentProps {
    info: ComponentInfo,
    setter?: (value: ComponentInfo) => void | undefined,
    parent: React.RefObject<HTMLDivElement>
    selectedSetter?: React.Dispatch<React.SetStateAction<ComponentInfo | null>>;
}

export const Component = ({info, setter, parent, selectedSetter}: ComponentProps) => {
    let content: React.JSX.Element;

    const commonProps = {
        style: info.style,
        className: `${style.component}`,
        id: `${info.tempID}`
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
            <EditableComponent
                info={info}
                setter={setter}
                parent={parent}
                selectedSetter={selectedSetter}
            >
                {content}
            </EditableComponent>
        ) : (content)
    )
}

type AllowedElements = HTMLImageElement | HTMLVideoElement | HTMLHeadingElement | HTMLParagraphElement;

export interface EditableComponentProps {
    info: ComponentInfo,
    children?: React.ReactElement<React.DOMAttributes<AllowedElements>>,
    parent?: React.RefObject<HTMLDivElement>,
    setter: (value: ComponentInfo) => void,
    selectedSetter?: React.Dispatch<React.SetStateAction<ComponentInfo | null>>;
}

export const EditableComponent = ({info, setter, children, parent, selectedSetter}: EditableComponentProps) => {
    const dragging = useRef(false);
    const offset = useRef({x: 0, y: 0});
    const draggedElement = useRef<HTMLElement | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
        draggedElement.current = e.currentTarget as HTMLElement;
        dragging.current = true;

        if (selectedSetter) {
            selectedSetter(prev =>
                prev !== null && prev.tempID !== info.tempID ? info : prev
            )
        }

        const rect = draggedElement.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        e.preventDefault();
    };


    const onMouseMove = (e: MouseEvent) => {
        if (!dragging.current || !parent?.current || !draggedElement.current) return;

        // Get bounding rects of the selected element (elementRect) and it's container (containerRect)
        const elementRect = draggedElement.current.getBoundingClientRect();
        const containerRect = parent.current.getBoundingClientRect();

        // Calculate pixel position on the container element
        let newX = e.clientX - containerRect.left - offset.current.x;
        let newY = e.clientY - containerRect.top - offset.current.y;

        // Clamp position so the elemement can't escape the boundry of the container
        newX = Math.max(0, Math.min(containerRect.width - elementRect.width, newX));
        newY = Math.max(0, Math.min(containerRect.height - elementRect.height, newY));

        // Convert to percentages :P
        const xPercent = (newX / containerRect.width) * 100;
        const yPercent = (newY / containerRect.height) * 100;

        info.style = {
            ...info.style,
            left: `${xPercent}%`,
            top: `${yPercent}%`
        }
        setter(info);
    };

    const onMouseUp = () => (dragging.current = false);

    const onClick = () => {
        if (selectedSetter !== undefined)
            selectedSetter(info);
    }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return React.cloneElement(children ? children : (<p>something went wrong</p>), {
        onMouseDown,
        onClick
    });
};
