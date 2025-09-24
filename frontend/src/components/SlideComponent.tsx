import type {SlideComponent as SlideComponentType} from "../../@types/slide";

export interface SlideComponentProps {
    getter: SlideComponentType;
    setter: (value: SlideComponentType[]) => void
}

export const SlideComponent = ({getter, setter}: SlideComponentProps) => {


    return (
        <div style={getter.style}>
            meow
        </div>
    )
}