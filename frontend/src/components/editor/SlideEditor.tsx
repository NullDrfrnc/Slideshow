import type {SlideType as SlideType} from "../../../@types/slide";
import {Slide} from "@/components/Slide.tsx";
import * as React from "react";
import type {ComponentInfo, TextType} from "@/domain/Component.ts";
import {useRef, useState} from "react";
import {ReactSVG as SVG} from "react-svg";

import {FileUploadService} from "@/services/FileUploadService.ts";

import color_bucket from "$/material-symbols--colors.svg"
import add_text from "$/material-symbols--text-fields.svg"
import add_photo from "$/material-symbols--add-photo-alternate-rounded.svg"
import add_video from "$/material-symbols--video-camera-back-add.svg"
import trashcan from "$/material-symbols--delete.svg";

import style from "#/components/SlideEditor.module.css"
import generic from "#/Generic.module.css";
import {baseUrl} from "@/services/AbstractService.ts";


export interface SlideEditorProps {
    getter?: SlideType | null;
    setter?: React.Dispatch<React.SetStateAction<SlideType>>;
    loading?: boolean;
}

export const SlideEditor = ({getter, setter, loading}: SlideEditorProps) => {
    const [selected, setSelected] = useState<ComponentInfo | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const fileUploadService: FileUploadService = FileUploadService.getInstance;

    const updateSlideComponent = (component: ComponentInfo | null) => {
        if (!component || !setter) return;
        setter(prev => {
            if (!prev || !prev.components) return prev;
            const updatedComponents = [...prev.components]
            const index = updatedComponents.findIndex(item => item.tempID === selected?.tempID)
            if (index === -1) return prev;

            const old = updatedComponents[index];

            if (old.type === component.type) {
                updatedComponents[index] = {
                    ...old,
                    ...component,
                }
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        fileUploadService.uploadImage({file}).then((r) => {
            console.log(r)
            if (r)
                addSlideComponent({
                    tempID: generateRandomID(),
                    type: "image",
                    alt: file.name,
                    url: `${baseUrl}${r.data.url}`
                })
        })


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
                            <SVG src={color_bucket}/>
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
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"add_text"}>
                            <SVG src={add_text}/>
                        </label>
                        <input
                            id={"add_text"}
                            title={"Add text"}
                            type={"button"}
                            onClick={() =>
                                addSlideComponent({
                                    tempID: generateRandomID(),
                                    type: "text",
                                    textType: "p",
                                    text: "test",
                                    style: {color: "#000000"}
                                })
                            }
                            style={{display: "none"}}
                        />
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"add_picture"}>
                            <SVG src={add_photo}/>
                        </label>
                        <input
                            id={"add_picture"}
                            ref={imageRef}
                            title={"Add picture"}
                            type={"file"}
                            accept={"image/*"}
                            onChange={handleFileSelect}
                            style={{display: "none"}}
                        />
                        <label className={`${generic.input} ${generic.primary}`} htmlFor={"add_video"}>
                            <SVG src={add_video}/>
                        </label>
                        <input
                            id={"add_video"}
                            title={"Add video"}
                            type={"file"}
                            onChange={() => alert("Not implemented")}
                            style={{display: "none"}}
                        />
                        {
                            selected &&
                            <>
                                <span className={`${generic.devider} ${generic.primary}`}/>
                                {selected.type === "text" &&
                                    <>
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
                                        <select name={"size"}
                                                id={"font_size"}
                                                className={`${generic.input} ${generic.primary}`}
                                                onChange={(e) => {
                                                    updateSlideComponent({
                                                        ...selected,
                                                        textType: e.target.value as TextType
                                                    })
                                                }}
                                                value={selected.textType}
                                        >
                                            <option value={"p"}>Paragraph</option>
                                            <option value={"h1"}>Heading 1</option>
                                            <option value={"h2"}>Heading 2</option>
                                            <option value={"h3"}>Heading 3</option>
                                        </select>
                                        <label htmlFor={"font_color"}
                                               className={`${generic.input} ${generic.primary}`}
                                               style={{
                                                   backgroundColor: selected.style?.color || "#000000"
                                               }}
                                        >
                                            <SVG src={color_bucket}/>
                                        </label>
                                        <input
                                            id={"font_color"}
                                            className={`${generic.d_none}`}
                                            title={"font_color"}
                                            type={"color"}
                                            value={selected.style?.color || "#000000"}
                                            onChange={(e) => updateSlideComponent({
                                                ...selected,
                                                style: {
                                                    ...selected?.style,
                                                    color: e.target.value
                                                }
                                            })}
                                        />
                                    </>
                                }
                                <label className={`${generic.input} ${generic.primary}`} htmlFor={"remove_selected"}>
                                    <SVG src={trashcan}/>
                                </label>
                                <input
                                    className={`${generic.input} ${generic.primary}`}
                                    id={"remove_selected"}
                                    title={"remove"}
                                    type={"button"}
                                    value={"Remove"}
                                    onClick={() => {
                                        if (selected)
                                            removeSlideComponent(selected)
                                    }}
                                    style={{display: "none"}}
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