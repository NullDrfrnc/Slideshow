import type {SlideType as slideType} from "../../@types/Slide";
import type {ComponentInfo} from "../../@types/Component.d.ts";
import {Component} from "@/components/Component.tsx";

import generic from "#/Generic.module.css";
import {useRef} from "react";
import * as React from "react";

export interface SlideProps {
    info: slideType
    className?: string
    slideSetter?: React.Dispatch<React.SetStateAction<slideType>>;
    selected?: slideType | null;
    selectedSetter?: React.Dispatch<React.SetStateAction<ComponentInfo | null>>;
    scale?: number;
}

export const Slide = ({info, className, slideSetter, selectedSetter, scale = 1}: SlideProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const setSlideComponent = (component: ComponentInfo) => {
        if (!slideSetter) return;

        slideSetter(prev => {
            if (!prev || !prev.components) return prev;

            const updatedComponents = prev.components.map((item: ComponentInfo) =>
                item.tempID === component.tempID ? component : item
            );

            return {
                ...prev,
                components: updatedComponents,
            };
        });
    };

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    ...info.style,
                    ...(scale && scale !== 1
                        ? {
                            width: `${100 * scale}vw`,
                            margin: "0",
                        }
                        : {}),
                }}
                className={`${generic.slide} ${className || ""}`}
            >
                {info.components?.map((component: ComponentInfo) => {
                    return (
                        <Component
                            info={component}
                            key={component.tempID}
                            parent={containerRef as React.RefObject<HTMLDivElement>}
                            {...(slideSetter ? {setter: setSlideComponent} : {})}
                            {...(selectedSetter ? {selectedSetter: selectedSetter} : {})}
                        />
                    )
                })}
            </div>
        </>
    )
}