import {Slide} from "@/components/Slide.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Slide as slideType} from "../../../@types/slide";
import {SlideService} from "@/services/SlideService.ts";

export const ViewSlide = () => {
    const service = SlideService.getInstance;
    const params = useParams();
    const [slide, setSlide] = useState<slideType>();

    useEffect(() => {
        const id: string | undefined = params.id;

        if (id !== undefined) {
            service.getByID(id)
                .then(r => {
                    setSlide(r?.data)
                })
                .catch(r => {
                    console.error(r)
                })
        }
    }, []);

    return (
        <>
            {
                slide &&
                <Slide info={slide}/>
            }
        </>
    );
}