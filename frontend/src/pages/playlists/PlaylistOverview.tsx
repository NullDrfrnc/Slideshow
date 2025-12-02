import {useNavigate} from "react-router-dom";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {useEffect, useState} from "react";
import type {PlaylistType} from "../../../@types/playlist";

import generic from "#/Generic.module.css"

export const PlaylistOverview = () => {
    const navigate = useNavigate();
    const service = PlaylistService.getInstance;
    const [playlists, setPlaylists] = useState<PlaylistType[]>([])

    useEffect(() => {
        service.getAll()
            .then(r => {
                setPlaylists(r?.data)
            })
            .catch(console.log)
    }, []);

    function deletePlaylist(id: string | undefined) {
        if (id)
            service.delete(id)
                .then(() => {
                    setPlaylists([...playlists].filter(p => p.id !== id))
                    alert(`Deleted playlist`)
                })
    }

    return (
        <>
            {playlists &&
                playlists.map((playlist: PlaylistType) => (
                    <div key={playlist.id!}>
                        <button className={`${generic.button}`}
                                onClick={() => navigate(`/playlists/edit/${playlist.id}`)}
                        >
                            edit
                        </button>
                        <button
                            onClick={() => deletePlaylist(playlist.id)}
                        >
                            delete
                        </button>
                        title: {playlist.title}, id: {playlist.id}
                    </div>
                ))
            }
            <button
                className={`${generic.button}`}
                onClick={() => navigate(`/playlists/create`)}
            >
                create
            </button>
        </>
    )
}