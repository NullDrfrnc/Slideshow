import {SlideService} from "@/services/SlideService.ts";
import {type FormEvent, useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import type {Slide} from "../../../@types/slide";
import {useNavigate} from "react-router-dom";

import generic from "#/Generic.module.css"
import style from "#/pages/Slides.module.css";

export const EditSlide = () => {
    const params = useParams();
    const service: SlideService = SlideService.getInstance;
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const [slide, setSlide] = useState<Slide | null>(null);

    useEffect(() => {
        const id = params.id;
        if (id) {
            service.getByID(id).then(r => {
                setSlide(r?.data)
            }).catch(alert);
        }
    }, []);

    useEffect(() => {
        if (titleInputRef.current && descriptionInputRef.current) {
            titleInputRef.current.value = slide?.title ?? "";
            descriptionInputRef.current.value = slide?.description ?? "";
        }
    }, [slide]);

    const update = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const title = titleInputRef.current?.value;
        const description = descriptionInputRef.current?.value;

        if (title) {
            service.update({
                id: slide?.id,
                title,
                description
            }).then(r => {
                setSlide(r?.data)
                alert("Update slide successfully")
            }).catch(alert);
        } else {
            alert("Please enter title");
        }
    }

    return (
        <>
            <div className={`${style.slidePage}`}>
                <div className={`${style.header}`}>
                    <form onSubmit={update}>
                        <button title={"back"} type={"button"} className={`${generic.button}`} onClick={() => navigate("/slides")}>
                            <i className="fa-solid fa-angle-left"/>
                        </button>
                        <input title={"title"} id="title" type="text" ref={titleInputRef} placeholder={"Title"}/>
                        <input title={"description"} id="description" type="text" ref={descriptionInputRef} placeholder={"description"}/>
                        <button title={"save"} className={`${generic.button} ${generic.f_right}`} type="submit">
                            <i className="fa-solid fa-floppy-disk"/>
                        </button>
                    </form>
                </div>
                <div className={`${style.slide}`}>
                    test
                </div>
            </div>
        </>
    );
}