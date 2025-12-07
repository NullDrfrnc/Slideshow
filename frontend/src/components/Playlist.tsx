import type {PlaylistType} from "../../@types/playlist";
import {Slide} from "@/components/Slide.tsx";

import generic from "#/Generic.module.css";
import style from "#/components/Playlist.module.css"
import {MdCreate, MdDelete} from "react-icons/md";

export interface PlaylistProps {
    playlist: PlaylistType;
    editPlaylist?: () => void;
    deletePlaylist?: () => void;
}

export const Playlist = ({playlist, editPlaylist, deletePlaylist}: PlaylistProps) => {
    return (
        <div
            key={playlist?.id}
            className={`${style.playlist}`}
        >
            <h2>
                Title: {playlist.title}
            </h2>
            <div
                className={`${style.slideRow}`}
            >
                {
                    playlist.slides?.map((slide: PlaylistType) => {
                        return (
                            <Slide
                                info={slide}
                                scale={0.2}
                                className={`${generic.thumbnail} ${style.playlistSlidethumbnail}`}
                            />
                        )
                    })
                }
            </div>
            <MdCreate
                style={{height: "2rem", width: "2rem"}}
                className={`${generic.input}`}
                onClick={editPlaylist}
            />
            <MdDelete
                style={{height: "2rem", width: "2rem"}}
                className={`${generic.input}`}
                onClick={deletePlaylist}
            />
        </div>
    )
}