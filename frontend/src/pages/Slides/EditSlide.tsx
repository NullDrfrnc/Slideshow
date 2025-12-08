import {SlideService} from "@/services/SlideService.ts";
import {type FormEvent, useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import type {SlideType} from "../../../@types/Slide";
import {useNavigate} from "react-router-dom";

import {Header} from "@/components/Header.tsx";
import {SlideEditor} from "@/components/editor/SlideEditor.tsx";
import generic from "#/Generic.module.css";

export const EditSlide = () => {
    const params = useParams();
    const service: SlideService = SlideService.getInstance;
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const [slide, setSlide] = useState<SlideType>({});

    useEffect(() => {
        const id = params.id;
        if (id) {
            service.getByID(id).then(r => {
                setSlide(r?.data)
                setLoading(false);
            }).catch(alert);
        }
    }, [params.id, service]);

    useEffect(() => {
        if (titleRef.current && descriptionRef.current) {
            titleRef.current.value = slide?.title ?? "";
            descriptionRef.current.value = slide?.description ?? "";
        }
    }, [slide]);

    const update = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;

        if (title) {
            service.update({
                ...slide, // IMPORTANT, this takes all the data currently set to the slide, the SlideEditor needs this to function properly
                title,
                description
            }).then(r => {
                setSlide(r?.data)
                alert("Update slide successfully")
                navigate("/slides")
            }).catch(alert);
        }
    }

    return (
        <>
            <Header onSave={update} back={"/slides"}>
                <input
                    className={`${generic.input}`}
                    title={"title"}
                    type="text"
                    ref={titleRef}
                    placeholder={"Title"}
                    required
                />
                <input
                    className={`${generic.input}`}
                    title={"description"}
                    type="text"
                    ref={descriptionRef}
                    placeholder={"description"}
                />
            </Header>
            <SlideEditor getter={slide} setter={setSlide} loading={loading}/>
        </>
    );
}