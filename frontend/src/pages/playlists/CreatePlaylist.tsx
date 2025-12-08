import generic from "#/Generic.module.css"
import {Header} from "@/components/Header.tsx";
import {type FormEvent, useEffect, useRef, useState} from "react";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {useNavigate} from "react-router-dom";
import {SlideService} from "@/services/SlideService.ts";
import type {SlideType} from "../../../@types/Slide";
import {Slide} from "@/components/Slide.tsx";

export const CreatePlaylist = () => {
    const navigate = useNavigate();
    const playlistService: PlaylistService = PlaylistService.getInstance;
    const slideService: SlideService = SlideService.getInstance;

    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLInputElement | null>(null)

    const [slides, setSlides] = useState<SlideType[]>([]);
    const [selectedSlides, setSelectedSlides] = useState<SlideType[]>([]);

    useEffect(() => {
        slideService.getAll().then(r => {
            setSlides(r.data);
        })
    }, []);

    const createPlaylist = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;

        if (title) {
            playlistService.create(
                {
                    title,
                    description,
                    slides: selectedSlides
                }
            ).then(r =>
                navigate(`/playlists/edit/${r?.data.id}`)
            ).catch(alert);
        }
    }

    return (
        <>
            <Header onSubmit={createPlaylist} back={"/playlists"}>
                <input
                    className={`${generic.input}`}
                    type={"text"}
                    ref={titleRef}
                    placeholder={"Title"}
                    required
                />
                <input
                    className={`${generic.input}`}
                    type={"text"}
                    ref={descriptionRef}
                    placeholder={"Description"}
                />
            </Header>
            {
                slides.map((slide: SlideType) => (
                    <>
                        <Slide info={slide} scale={0.25}/>
                        <input
                            type={"checkbox"}
                            checked={selectedSlides.some(s => s.id === slide.id)}
                            onChange={(e) => setSelectedSlides(prev =>
                                e.target.checked
                                    ? [...prev, slide]
                                    : prev.filter(s => s.id !== slide.id)
                            )}
                        />
                    </>
                ))
            }
        </>
    )
}