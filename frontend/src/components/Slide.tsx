import type {SlideType as slideType} from "../../@types/slide";
import type {ComponentInfo} from "@/domain/Component.ts";
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

export const Slide = ({info, className, slideSetter, selectedSetter, scale}: SlideProps) => {
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
                style={{
                    width: `${100 * (scale || 1)}%`,
                    height: `${100 * (scale || 1)}%`
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        ...info.style,
                        position: "relative",
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        width: `${100 / (scale || 1)}%`,
                        height: `${100 / (scale || 1)}%`,
                    }}
                    className={`${generic.slide} ${generic.m_auto}`}
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
            </div>
        </>
    )
}