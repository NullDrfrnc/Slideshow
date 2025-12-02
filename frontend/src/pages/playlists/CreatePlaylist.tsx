import generic from "#/Generic.module.css"
import {Header} from "@/components/Header.tsx";
import {type FormEvent, useRef} from "react";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {useNavigate} from "react-router-dom";

export const CreatePlaylist = () => {
    const service: PlaylistService = PlaylistService.getInstance;
    const titleRef = useRef<HTMLInputElement | null>(null)

    const navigate = useNavigate();

    const createPlaylist = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleRef.current?.value;

        if (title) {
            service.create({title}).then(r =>
                navigate(`/playlists/edit/${r?.data.id}`)
            ).catch(alert);
        }
    }

    return (
        <>
            <div className={`${generic.m_auto}`}>
                <Header onSubmit={createPlaylist} back={"/playlists"}>
                    <input
                        className={`${generic.input}`}
                        type={"text"}
                        ref={titleRef}
                        placeholder={"Title"}
                        required
                    />
                </Header>
            </div>
        </>
    )
}