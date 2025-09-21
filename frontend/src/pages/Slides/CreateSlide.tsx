import {type FormEvent, useRef, useState} from "react";
import {SlideService} from "@/services/SlideService.ts";
import {useNavigate} from "react-router-dom";

import style from "#/pages/Slides.module.css";
import {Header} from "@/components/Header.tsx";
import {SlideEditor} from "@/components/SlideEditor.tsx";
import type {Slide} from "../../../@types/slide";

export const CreateSlide = () => {
    const service: SlideService = SlideService.getInstance;
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null)
    const [slide, setSlide] = useState<Slide | null>({title: "", description: undefined, style: undefined});

    const navigate = useNavigate();

    const create = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const title = titleInputRef.current?.value;
        const description = descriptionInputRef.current?.value;

        if (title) {
            service.create({...slide, title: title, description: description}).then(r =>
                navigate(`/slides/edit/${r?.data.id}`)
            ).catch(alert);
        } else {
            alert("Please enter title");
        }
    }

    return (
        <>
            <div className={`${style.slidePage}`}>
                <Header onSubmit={create} back={"/slides"}>
                    <input type="text" ref={titleInputRef} placeholder={"Title"}/>
                    <input type="text" ref={descriptionInputRef} placeholder={"Description"}/>
                </Header>
                <SlideEditor getter={slide} setter={setSlide}/>
            </div>

        </>
    );
}