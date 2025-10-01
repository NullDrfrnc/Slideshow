import type {Slide as slideType} from "../../@types/slide";
import type {ComponentInfo} from "@/domain/Component.ts";
import {Component} from "@/components/Component.tsx";

import generic from "#/Generic.module.css";
import {useRef} from "react";
import * as React from "react";

export interface SlideProps {
    info: slideType
    className?: string
    slideSetter?: (info: slideType) => void | undefined
}

export const Slide = ({info, className, slideSetter}: SlideProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const setSlideComponent = (component: ComponentInfo) => {
        if (!slideSetter || !info.components) return;
        slideSetter({
            ...info,
            components: info.components.map((item: ComponentInfo) =>
                item.id === component.id ? component : item
            ),
        });
    }

    return (
        <>
            <div ref={containerRef} style={info.style} className={`${className || generic.slide}`}>
                {info.components?.map((component: ComponentInfo) => {
                    return (
                        <Component
                            info={component}
                            key={component.id}
                            parent={containerRef as React.RefObject<HTMLDivElement>}
                            {...(slideSetter ? { setter: setSlideComponent } : {})}
                        />
                    )
                })}
            </div>
        </>
    )
}