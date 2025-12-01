import {SlideService} from "@/services/SlideService.ts";
import {type FormEvent, useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import type {SlideType} from "../../../@types/Slide";
import {useNavigate} from "react-router-dom";

import style from "#/pages/Slides.module.css";
import {Header} from "@/components/Header.tsx";
import {SlideEditor} from "@/components/editor/SlideEditor.tsx";
import generic from "#/Generic.module.css";

export const EditSlide = () => {
    const params = useParams();
    const service: SlideService = SlideService.getInstance;
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null)
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
        if (titleInputRef.current && descriptionInputRef.current) {
            titleInputRef.current.value = slide?.title ?? "";
            descriptionInputRef.current.value = slide?.description ?? "";
        }
    }, [slide]);

    const update = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleInputRef.current?.value;
        const description = descriptionInputRef.current?.value;

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
            <div className={`${style.slidePage}`}>
                <Header onSubmit={update} back={"/slides"}>
                    <input
                        className={`${generic.input}`}
                        title={"title"}
                        type="text"
                        ref={titleInputRef}
                        placeholder={"Title"}
                    />
                    <input
                        className={`${generic.input}`}
                        title={"description"}
                        type="text"
                        ref={descriptionInputRef}
                        placeholder={"description"}
                    />
                </Header>
                <SlideEditor getter={slide} setter={setSlide} loading={loading}/>
            </div>
        </>
    );
}