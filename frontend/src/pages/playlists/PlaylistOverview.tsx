import {useNavigate} from "react-router-dom";
import {PlaylistService} from "@/services/PlaylistService.ts";
import {useEffect, useState} from "react";
import type {PlaylistType} from "../../../@types/playlist";

import generic from "#/Generic.module.css"

import {Header} from "@/components/Header.tsx";
import {MdCreate, MdDelete} from "react-icons/md";
import {BiPlus} from "react-icons/bi";
import * as React from "react";

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
            <Header
                onSubmit={() => navigate(`/playlists/create`)}
                submitIcon={<BiPlus/>}
            >
                <h3>
                    Playlists
                </h3>
            </Header>
            <table className={`${generic.table}`}>
                <thead>
                <tr>
                    <th>
                        title:
                    </th>
                    <th>
                        description:
                    </th>
                </tr>
                </thead>
                <tbody>
                {playlists &&
                    playlists.map((playlist: PlaylistType) => (
                        <tr>
                            <td>{playlist.title}</td>
                            <td>{playlist.description}</td>
                            <td>
                                <MdCreate
                                    style={{height: "2rem", width: "2rem"}}
                                    className={`${generic.input}`}
                                    onClick={() => navigate(`/playlists/edit/${playlist.id}`)}
                                />
                                <MdDelete
                                    style={{height: "2rem", width: "2rem"}}
                                    className={`${generic.input}`}
                                    onClick={() => deletePlaylist(playlist.id)}
                                />
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}