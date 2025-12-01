import {type FormEvent, useRef, useState} from "react";
import {SlideService} from "@/services/SlideService.ts";
import {useNavigate} from "react-router-dom";

import {Header} from "@/components/Header.tsx";
import {SlideEditor} from "@/components/editor/SlideEditor.tsx";
import type {SlideType} from "../../../@types/Slide";

import generic from "#/Generic.module.css";
import style from "#/pages/Slides.module.css";


export const CreateSlide = () => {
    const service: SlideService = SlideService.getInstance;
    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const descriptionInputRef = useRef<HTMLInputElement | null>(null)
    const [slide, setSlide] = useState<SlideType>({components: [], style: {backgroundColor: "#FFFFFF"}});

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
                    <input className={`${generic.input}`} type="text" ref={titleInputRef} placeholder={"Title"}/>
                    <input className={`${generic.input}`} type="text" ref={descriptionInputRef} placeholder={"Description"}/>
                </Header>
                <SlideEditor getter={slide} setter={setSlide}/>
            </div>
        </>
    );
}