import type {Slide as slideType} from "../../@types/slide";
import {ImageComponent, TextComponent, TextType, VideoComponent} from "../../@types/component"

import generic from "#/Generic.module.css";

const baseURL = import.meta.env.VITE_API_URL;

export interface SlideProps {
    info: slideType
    className?: string
}

export const Slide = ({info, className}: SlideProps) => {

    return (
        <>
            <div style={info.style} className={`${className || generic.slide}`}>
                {info.components?.map((component) => {
                    if (component instanceof TextComponent) {
                        switch (component.textType) {
                            case TextType.h1:
                                return (<h1 key={component.id} style={component.style}>{component.text}</h1>)
                            case TextType.h2:
                                return (<h2 key={component.id} style={component.style}>{component.text}</h2>)
                            case TextType.h3:
                                return (<h3 key={component.id} style={component.style}>{component.text}</h3>)
                            case TextType.p:
                            default:
                                return (<p key={component.id} style={component.style}>{component.text}</p>)
                        }
                    } else if (component instanceof ImageComponent) {
                        return (
                            <img src={`${baseURL}/photos/${component.url}`} alt={component.alt}/>
                        )
                    } else if (component instanceof VideoComponent) {
                        return (
                            <video src={`${baseURL}/videos/${component.url}`} autoPlay/>
                        )
                    }
                })}
            </div>
        </>
    )
}