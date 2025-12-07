import {useNavigate} from "react-router-dom";

import style from "#/components/Sidebar.module.css"

import {MdSlideshow} from "react-icons/md";
import {PiSquaresFourBold} from "react-icons/pi";

export const Sidebar = () => {
    const navigate = useNavigate()


    return (
        <>
            <div
                className={`${style.sidebar}`}
            >
                <MdSlideshow
                    onClick={() => navigate("/slides")}
                    className={`${style.sidebarButton}`}
                />
                <PiSquaresFourBold
                    onClick={() => navigate("/playlists")}
                    className={`${style.sidebarButton}`}
                />
            </div>
        </>
    )
}