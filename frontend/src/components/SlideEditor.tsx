import type {Slide as SlideType} from "../../@types/slide";
import {Slide} from "@/components/Slide.tsx";
import * as React from "react";
import type {ComponentInfo} from "@/domain/Component.ts";
import {useRef, useState} from "react";
import {ReactSVG as SVG} from "react-svg";

import background_color from "$/material-symbols--colors.svg"
import add_text from "$/material-symbols--text-fields.svg"
import add_photo from "$/material-symbols--add-photo-alternate-rounded.svg"
import add_video from "$/material-symbols--video-camera-back-add.svg"


import style from "#/components/SlideEditor.module.css"
import generic from "#/Generic.module.css";


export interface SlideEditorProps {
    getter?: SlideType | null;
    setter?: React.Dispatch<React.SetStateAction<SlideType>>;
    loading?: boolean;
}

export const SlideEditor = ({getter, setter, loading}: SlideEditorProps) => {
    const [selected, setSelected] = useState<ComponentInfo | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);

    const updateSlideComponent = (component: ComponentInfo | null) => {
        if (!component || !setter) return;
        setter(prev => {
            if (!prev || !prev.components) return prev;
            const updatedComponents = [...prev.components]
            const index = updatedComponents.findIndex(item => item.tempID === selected?.tempID)
            const toUpdate = updatedComponents[index];
            if (component.type === "text" && toUpdate.type === "text") {
                toUpdate.text = component.text;
            }

            return {
                ...prev,
                components: updatedComponents
            }
        })
    }

    const removeSlideComponent = (component: ComponentInfo) => {
        if (!setter) return;
        setter(prev => {
            if (!prev || !prev.components) return prev;
            return {
                ...prev,
                components: prev.components.filter((item: ComponentInfo) =>
                    item.tempID !== component.tempID
                )
            } as SlideType
        })
        setSelected(null);
    }

    const addSlideComponent = (component: ComponentInfo) => {
        if (!setter || !component) return;
        setter(prev => {
                if (!prev || !prev.components) return prev;
                const updatedComponents = [...prev.components];

                updatedComponents.push(component);

                return {
                    ...prev,
                    components: updatedComponents
                } as SlideType
            }
        )
        setSelected(component);
    }

    const addImageComponent = (component: ComponentInfo) => {
        const uploadedFile = imageRef.current?.files?.item(0);
        if (!setter || !component || !uploadedFile) return;

        if(component.type === "image")

        addSlideComponent(component);
    }

    const generateRandomID = () => {
        return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    }

    return (
        <>
            {getter && setter ?
                <>
                    <div className={`${generic.properties}`}>
                        <label htmlFor={"background_color"} className={`${generic.input} ${generic.primary}`}
                               style={{
                                   backgroundColor: getter.style?.backgroundColor || "#000000"
                               }}>
                            <SVG src={background_color}/>
                        </label>
                        <input
                            id={"background_color"}
                            className={`${generic.d_none}`}
                            title={"backgound_color"}
                            type={"color"}
                            value={getter.style?.backgroundColor || "#000000"}
                            onChange={(e) => setter!({
                                ...getter,
                                style: {
                                    ...getter?.style,
                                    backgroundColor: (e.target as HTMLInputElement).value
                                }
                            })}
                        />
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"Add text"}>
                            <SVG src={add_text}/>
                        </label>
                        <input
                            id={"Add text"}
                            title={"Add text"}
                            type={"button"}
                            onClick={() =>
                                addSlideComponent({
                                    tempID: generateRandomID(),
                                    type: "text",
                                    textType: "p",
                                    text: "test",
                                })
                            }
                            style={{display: "none"}}
                        />
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"Add picture"}>
                            <SVG src={add_photo}/>
                        </label>
                        <input
                            id={"Add picture"}
                            ref={imageRef}
                            title={"Add picture"}
                            type={"file"}
                            onInput={() => addImageComponent({
                                type: "image",
                                alt: "",
                                url: "",
                            })}
                            style={{display: "none"}}
                        />
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"Add video"}>
                            <SVG src={add_video}/>
                        </label>
                        <input
                            id={"Add video"}
                            // ref={videoRef}
                            title={"Add video"}
                            type={"file"}
                            onInput={() => addImageComponent({
                                type: "video",
                                url: "",
                            })}
                            style={{display: "none"}}
                        />
                        {
                            selected &&
                            <>
                                <span className={`${generic.devider} ${generic.primary}`}/>
                                {selected.type === "text" &&
                                    <input
                                        className={`${generic.input} ${generic.primary}`}
                                        title={"Add text"}
                                        type={"text"}
                                        value={selected.text}
                                        onChange={(e) => updateSlideComponent({
                                            ...selected,
                                            text: e.target.value
                                        })}
                                    />
                                }
                                <input
                                    className={`${generic.input} ${generic.primary}`}
                                    title={"remove"}
                                    type={"button"}
                                    value={"Remove"}
                                    onClick={() => {
                                        if (selected)
                                            removeSlideComponent(selected)
                                    }}
                                />
                            </>
                        }
                    </div>
                    <Slide
                        key={getter.id}
                        className={`${style.editorSlide}`}
                        info={getter}
                        slideSetter={setter}
                        selectedSetter={setSelected}
                    />
                </>
                :
                !loading &&
                <div>
                    no slide found.
                </div>
            }
        </>
    )
}