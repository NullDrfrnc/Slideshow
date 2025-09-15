import {type FormEvent, useRef} from "react";
import {SlideService} from "@/services/SlideService.ts";
import {useNavigate} from "react-router-dom";

import generic from "#/Generic.module.css"
import style from "#/pages/Slides.module.css";

export const CreateSlide = () => {
    const service: SlideService = SlideService.getInstance;
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate();


    const create = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const title = titleInputRef.current?.value;
        const description = descriptionInputRef.current?.value;

        if (title) {
            service.create({
                title,
                description
            }).then(r =>
                navigate(`/slides/edit/${r?.data.id}`)
            ).catch(alert);
        } else {
            alert("Please enter title");
        }
    }

    return (
        <>
            <div className={`${style.slidePage}`}>
                <div className={`${style.header}`}>
                    <form onSubmit={create}>
                        <button type={"button"} className={`${generic.button}`} onClick={() => navigate("/slides")}>
                            <i className="fa-solid fa-angle-left"/>
                        </button>
                        <input id="title" type="text" ref={titleInputRef} placeholder={"Title"}/>
                        <input id="description" type="text" ref={descriptionInputRef} placeholder={"Description"}/>
                        <button className={`${generic.button} ${generic.f_right}`} type="submit">
                            <i className="fa-solid fa-floppy-disk"/>
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}