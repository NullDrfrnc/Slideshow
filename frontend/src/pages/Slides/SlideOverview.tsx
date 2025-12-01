import {useEffect, useState} from "react";
import {SlideService} from "@/services/SlideService.ts";
import type {SlideType} from "../../../@types/Slide";
import {useNavigate} from "react-router-dom";

import generic from "#/Generic.module.css"

export const SlideOverview = () => {
    const navigate = useNavigate()
    const service: SlideService = SlideService.getInstance;
    const [slides, setSlides] = useState<SlideType[]>([]);

    useEffect(() => {
        service.getAll()
            .then(r => {
                setSlides(r?.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    function deleteSlide(id: string | undefined) {
        if (id)
            service.delete(id)
                .then(r => {
                        setSlides([...slides].filter(s => s.id !== id))
                        alert(`Deleted Slide: ${r?.data?.id}`)
                    }
                )
                .catch(err =>
                    alert(`Something went wrong: ${err}`)
                );
    }

    return (
        <>
            {slides &&
                slides.map((slide: SlideType) => (
                    <div key={slide.id!}>
                        <button className={`${generic.button}`}
                                onClick={() => navigate(`/slides/edit/${slide.id}`)}>edit
                        </button>
                        <button className={`${generic.button}`} onClick={() => window.open(`/slides/view/${slide.id}`, '_blank')}>view
                        </button>
                        <button className={`${generic.button}`} onClick={() => deleteSlide(slide.id)}>delete</button>
                        title: {slide.title}, description: {slide.description}, id: {slide.id}
                    </div>
                ))
            }
            <button className={`${generic.button}`} onClick={() => navigate(`/slides/create`)}>Create</button>
        </>
    )
}