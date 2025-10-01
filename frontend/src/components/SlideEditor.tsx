import type {Slide as SlideType} from "../../@types/slide";
import {Slide} from "@/components/Slide.tsx";

import style from "#/components/SlideEditor.module.css"

export interface SlideEditorProps {
    getter?: SlideType | null;
    setter?: (value: SlideType) => void;
    loading?: boolean;
}

export const SlideEditor = ({getter, setter, loading}: SlideEditorProps) => {
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
                                value={getter.style?.backgroundColor}
                                onInput={(e) => setter({
                                    ...getter,
                                    style: {
                                        ...getter?.style,
                                        backgroundColor: (e.target as HTMLInputElement).value
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <Slide
                        key={getter.id}
                        className={`${style.editorSlide}`}
                        info={getter}
                        slideSetter={setter}
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