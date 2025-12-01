import {Slide} from "@/components/Slide.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SlideType as slideType} from "../../../@types/Slide";
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
                .catch(err => {
                    console.error(err)
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