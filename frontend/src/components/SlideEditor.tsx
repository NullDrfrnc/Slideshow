import type {Slide as slideType, Slide as SlideType} from "../../@types/slide";
import {Slide} from "@/components/Slide.tsx";

import style from "#/components/SlideEditor.module.css"
import * as React from "react";
import type {ComponentInfo} from "@/domain/Component.ts";

export interface SlideEditorProps {
    getter?: SlideType | null;
    setter?: React.Dispatch<React.SetStateAction<slideType>>;
    loading?: boolean;
}

export const SlideEditor = ({getter, setter, loading}: SlideEditorProps) => {
    const [selected, setSelected] = React.useState<ComponentInfo | null>(null);

    const removeSlideComponent = (component: ComponentInfo) => {
        if (!setter) return;

        setter(prev => {
            if (!prev || !prev.components) return prev;

            const updatedComponents = prev.components.map((item: ComponentInfo) =>
                item.id === component.id ? null : item
            )

            return {
                ...prev,
                components: updatedComponents
            } as slideType
        })

        setSelected(null);
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
                            <input
                                title={"remove"}
                                type={"button"}
                                value={"Remove"}
                                onClick={() => {
                                    if (selected)
                                        removeSlideComponent(selected)
                                }}
                            />
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