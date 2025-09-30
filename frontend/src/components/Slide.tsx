import type {Slide as slideType} from "../../@types/slide";
import type {ComponentInfo} from "@/domain/Component.ts";
import {Component} from "@/components/Component.tsx";

import generic from "#/Generic.module.css";

export interface SlideProps {
    info: slideType
    className?: string
    setter?: (info: slideType) => void | undefined
}

export const Slide = ({info, className, setter}: SlideProps) => {
    return (
        <>
            <div style={info.style} className={`${className || generic.slide}`}>
                {info.components?.map((component: ComponentInfo) => {
                    return (
                        <Component
                            info={component}
                            key={component.id}
                            {...setter ? setter : {}}
                        />
                    )
                })}
            </div>
        </>
    )
}