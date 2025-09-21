import * as React from "react";
import {useNavigate} from "react-router-dom";

import style from "#/components/Header.module.css";
import generic from "#/Generic.module.css";

export interface HeaderProps {
    children?: React.ReactNode | undefined;
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
    back?: string | undefined;
    delta?: number | undefined;
}

export const Header = ({children, onSubmit, back, delta}: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className={`${style.header}`}>
            <form onSubmit={onSubmit}>
                {
                    back &&
                    <button title={"back"} type={"button"} className={`${generic.button}`}
                            onClick={() => back ? navigate(back) : delta ? navigate(delta) : navigate(-1)}>
                        <i className="fa-solid fa-angle-left"/>
                    </button>
                }
                {children}
                <button title={"save"} className={`${generic.button} ${generic.f_right}`} type="submit">
                    <i className="fa-solid fa-floppy-disk"/>
                </button>
            </form>
        </div>
    )
}