import type {Slide as slideType}  from "../../@types/slide";

export interface SlideProps {
    info: slideType
}

export const Slide = ({info}: SlideProps) => {
    return (
        <>
            <div>id: {info.id}</div>
            <div>title: {info.title}</div>
            <div>description: {info.description}</div>
        </>
    )
}