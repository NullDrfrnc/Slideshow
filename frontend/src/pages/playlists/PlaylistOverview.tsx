import {useNavigate} from "react-router-dom";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {useEffect, useState} from "react";
import type {PlaylistType} from "../../../@types/playlist";

import generic from "#/Generic.module.css"
import {Header} from "@/components/Header.tsx";
import {Playlist} from "@/components/Playlist.tsx";

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
            <Header>
                <h3>
                    Playlists
                </h3>
            </Header>
            {playlists &&
                playlists.map((playlist: PlaylistType) => (
                    <div key={playlist.id!}>
                        <Playlist
                            playlist={playlist}
                            editPlaylist={() => navigate(`/playlists/edit/${playlist.id}`)}
                            deletePlaylist={() => deletePlaylist(playlist.id)}
                        />
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