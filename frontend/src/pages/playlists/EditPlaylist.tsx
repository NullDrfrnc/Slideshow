import {useParams} from "react-router";
import {SlideService} from "@/services/SlideService.ts";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {type FormEvent, useEffect, useRef, useState} from "react";
import type {PlaylistType} from "../../../@types/playlist";
import {Header} from "@/components/Header.tsx";
import generic from "#/Generic.module.css";
import type {SlideType} from "../../../@types/Slide";
import {Slide} from "@/components/Slide.tsx";
import {useNavigate} from "react-router-dom";

export const EditPlaylist = () => {
    const params = useParams();
    const slideService = SlideService.getInstance;
    const playlistService = PlaylistService.getInstance;

    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement | null>(null);

    const [slides, setSlides] = useState<PlaylistType[]>([]);
    const [playlist, setPlaylist] = useState<PlaylistType>({});

    useEffect(() => {
        const id = params.id;
        if (id) {
            playlistService.getByID(id).then(r => setPlaylist(r.data));
            slideService.getAll().then(r => setSlides(r.data));
        }
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.value = playlist.title || ""
        }
    }, [playlist]);

    const updatePlaylist = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleRef.current?.value;

        if (title) {
            playlistService.update({
                ...playlist,
                title
            }).then((r) => {
                setPlaylist(r.data)
                alert("Update playlist successfully")
                navigate("/playlists")
            }).catch(alert)
        }
    }

    return (
        <>
            <Header onSubmit={updatePlaylist} back={"/playlists"}>
                <input
                    className={`${generic.input}`}
                    type={"text"}
                    ref={titleRef}
                    placeholder={"Title"}
                    required
                />
            </Header>
            {
                slides.map((slide: SlideType) => (
                    <>
                        <Slide info={slide} scale={0.25}/>
                        <input
                            type={"checkbox"}
                            checked={playlist.slides?.some(s => s.id === slide.id)}
                            onChange={(e) => setPlaylist({
                                    ...playlist,
                                    slides: e.target.checked
                                        ? [...playlist.slides || [], slide]
                                        : playlist.slides?.filter(s => s.id !== slide.id)
                                }
                            )}
                        />
                    </>
                ))
            }
        </>
    )
}