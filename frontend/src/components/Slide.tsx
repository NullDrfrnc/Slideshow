import type {Slide as slideType} from "../../@types/slide";

import generic from "#/Generic.module.css";

export interface SlideProps {
    info: slideType
    className?: string
}

export const Slide = ({info, className}: SlideProps) => {
    return (
        <>
            <div style={info.style} className={`${className || generic.slide}`}>
                <div>id: {info.id}</div>
                <div>title: {info.title}</div>
                <div>description: {info.description}</div>
                <div>style: {JSON.stringify(info.style)}</div>
            </div>
        </>
    )
}