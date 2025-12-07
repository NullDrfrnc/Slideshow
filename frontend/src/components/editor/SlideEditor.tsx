import type {SlideType as SlideType} from "../../../@types/Slide";
import {Slide} from "@/components/Slide.tsx";
import * as React from "react";
import type {ComponentInfo, TextType} from "../../../@types/Component.d.ts";
import {useRef, useState} from "react";

import {FileUploadService} from "@/services/FileUploadService.ts";

import style from "#/components/SlideEditor.module.css"
import generic from "#/Generic.module.css";
import {baseUrl} from "@/services/AbstractService.ts";
import {IoMdColorFill, IoMdTrash} from "react-icons/io";
import {MdTextFields} from "react-icons/md";
import {BiSolidImageAdd} from "react-icons/bi";


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

            const updatedComponents = [...prev.components];
            const index = updatedComponents.findIndex(c => c.tempID === selected?.tempID);

            if (index === -1) return prev;

            const oldComponent = updatedComponents[index];

            // merge style separately (so nested objects merge too)
            const merged = {
                ...oldComponent,
                ...component,
                style: {
                    ...oldComponent.style,
                    ...component.style
                }
            } as ComponentInfo;

            updatedComponents[index] = merged;

            // keep selected in sync, or typing dies again
            if (setSelected) setSelected(merged);

            return {
                ...prev,
                components: updatedComponents
            };
        });
    };


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
        if (!e.target.files || !e.target) return;
        const file = e.target.files![0];

        fileUploadService.uploadImage({file}).then((r) => {
            if (!r) return;

            const {url, filename} = r.data;
            addSlideComponent({
                tempID: generateRandomID(),
                type: "image",
                filename: filename,
                alt: filename,
                url: `${baseUrl}${url}`,
                style: {
                    height: "100%",
                }
            })
        }).catch(alert)


    }

    const getNumberFromStyleHeight = (element: ComponentInfo) => {
        if (!element?.style || !element.style.height) return 10;
        return parseFloat(element.style?.height as string);
    }

    const getNumberFromStyleWidth = (element: ComponentInfo) => {
        if (!element?.style || !element.style.width) return 10;
        return parseFloat(element.style?.width as string);
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
                            <IoMdColorFill />
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
                            <MdTextFields />
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
                            <BiSolidImageAdd />
                        </label>
                        <input
                            id={"add_picture"}
                            ref={imageRef}
                            title={"Add picture"}
                            type={"file"}
                            accept={"image/png, image/jpeg, image/gif"}
                            onChange={handleFileSelect}
                            style={{display: "none"}}
                        />
                        {/* TODO: Implement this shit at some point */}
                        {/*<label className={`${generic.input} ${generic.primary}`} htmlFor={"add_video"}>*/}
                        {/*    <SVG src={`${add_video}`}/>*/}
                        {/*</label>*/}
                        {/*<input*/}
                        {/*    id={"add_video"}*/}
                        {/*    title={"Add video"}*/}
                        {/*    type={"file"}*/}
                        {/*    onChange={() => alert("Not implemented")}*/}
                        {/*    style={{display: "none"}}*/}
                        {/*/>*/}
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
                                            <IoMdColorFill />
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
                                {selected.type !== "text" &&
                                    <>
                                        <input
                                            className={`${generic.input} ${generic.primary}`}
                                            id={"resize_selected_height"}
                                            title={"resize_height"}
                                            type={"number"}
                                            value={getNumberFromStyleHeight(selected)}
                                            min={1}
                                            max={100}
                                            onChange={(e) => updateSlideComponent({
                                                ...selected,
                                                style: {
                                                    ...selected?.style,
                                                    height: `${e.target.value}%`
                                                }
                                            })}
                                        />
                                        <input
                                            className={`${generic.input} ${generic.primary}`}
                                            id={"resize_selected_width"}
                                            title={"resize_width"}
                                            type={"number"}
                                            value={getNumberFromStyleWidth(selected)}
                                            min={1}
                                            max={100}
                                            onChange={(e) => updateSlideComponent({
                                                ...selected,
                                                style: {
                                                    ...selected?.style,
                                                    width: `${e.target.value}%`
                                                }
                                            })}
                                        />
                                    </>
                                }
                                <label className={`${generic.input} ${generic.primary}`} htmlFor={"remove_selected"}>
                                    <IoMdTrash />
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