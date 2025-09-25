import type {Slide as slideType} from "../../@types/slide";
import {ImageComponent, TextComponent, VideoComponent} from "../domain/Component.ts"

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
                    if (component.type === "text") {
                        const textComponent = component as TextComponent;
                        switch (textComponent.textType) {
                            case "h1":
                                return (<h1 key={textComponent.id} style={textComponent.style}>{textComponent.text}</h1>)
                            case "h2":
                                return (<h2 key={textComponent.id} style={textComponent.style}>{textComponent.text}</h2>)
                            case "h3":
                                return (<h3 key={textComponent.id} style={textComponent.style}>{textComponent.text}</h3>)
                            case "p":
                            default:
                                return (<p key={textComponent.id} style={textComponent.style}>{textComponent.text}</p>)
                        }
                    } else if (component.type === "image") {
                        const imgComponent = component as ImageComponent;
                        return (
                            <img src={`${baseURL}/photos/${imgComponent.url}`} alt={imgComponent.alt}/>
                        )
                    } else if (component.type === "video") {
                        const videoComponent = component as VideoComponent;
                        return (
                            <video src={`${baseURL}/videos/${videoComponent.url}`} autoPlay/>
                        )
                    }
                })}
            </div>
        </>
    )
}