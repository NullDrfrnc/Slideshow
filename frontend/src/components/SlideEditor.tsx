import type {Slide as SlideType} from "../../@types/slide";
import {Slide} from "@/components/Slide.tsx";

import style from "#/components/SlideEditor.module.css"
import * as React from "react";
import type {ComponentInfo} from "@/domain/Component.ts";
import {useRef, useState} from "react";

export interface SlideEditorProps {
    getter?: SlideType | null;
    setter?: React.Dispatch<React.SetStateAction<SlideType>>;
    loading?: boolean;
}

export const SlideEditor = ({getter, setter, loading}: SlideEditorProps) => {
    const [selected, setSelected] = useState<ComponentInfo | null>(null);
    const addSlideComponentRef = useRef<HTMLSelectElement>(null);

    const removeSlideComponent = (component: ComponentInfo) => {
        if (!setter) return;
        setter(prev => {
            if (!prev || !prev.components) return prev;
            return {
                ...prev,
                components: prev.components.filter((item: ComponentInfo) =>
                    item.id !== component.id
                )
            } as SlideType
        })
        setSelected(null);
    }

    const addSlideComponent = () => {
        if (!setter) return;
        setter(prev => {
                if (!prev || !prev.components) return prev;
                const updatedComponents = prev.components;

                updatedComponents.push({
                    type: "text",
                    textType: "p",
                    text: "test"
                })

                return {
                    ...prev,
                    components: updatedComponents
                } as SlideType
            }
        )
    }

    return (
        <>
            {getter && setter ?
                <>
                    <div className={`${style.properties}`}>
                        <div>
                            <label htmlFor={"background_color"}>Background Color</label>
                            <input
                                title={"backgound_color"}
                                type={"color"}
                                value={getter.style?.backgroundColor || "#000000"}
                                onChange={(e) => setter({
                                    ...getter,
                                    style: {
                                        ...getter?.style,
                                        backgroundColor: (e.target as HTMLInputElement).value
                                    }
                                })}
                            />
                            <select ref={addSlideComponentRef} name={"componentList"} id={"componentList"}>
                                <option value={"text"}>text</option>
                                <option value={"image"}>image</option>
                                <option value={"video"}>video</option>
                            </select>
                            <input
                                title={"add"}
                                type={"button"}
                                value={"Add"}
                                onClick={addSlideComponent}
                            />
                            {
                                selected &&
                                <input
                                    title={"remove"}
                                    type={"button"}
                                    value={"Remove"}
                                    onClick={() => {
                                        if (selected)
                                            removeSlideComponent(selected)
                                    }}
                                />
                            }

                        </div>
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