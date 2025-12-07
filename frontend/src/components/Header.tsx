import * as React from "react";
import {useNavigate} from "react-router-dom";

import style from "#/components/Header.module.css";
import generic from "#/Generic.module.css";

import {MdKeyboardReturn, MdSaveAs} from "react-icons/md";

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
            {
                onSubmit ?
                    <form onSubmit={onSubmit}>
                        {
                            back &&
                            <button title={"back"} type={"button"} className={`${generic.input}`}
                                    onClick={() => back ? navigate(back) : delta ? navigate(delta) : navigate(-1)}>
                                <MdKeyboardReturn/>
                            </button>
                        }
                        {children}
                        <button title={"save"} className={`${generic.input} ${generic.f_right}`} type="submit">
                            <MdSaveAs/>
                        </button>
                    </form>
                    :
                    <>
                        {children}
                    </>
            }

        </div>
    )
}