import * as React from "react";
import {useNavigate} from "react-router-dom";

import style from "#/components/Header.module.css";
import generic from "#/Generic.module.css";

import {MdKeyboardReturn, MdSaveAs} from "react-icons/md";
import {BiPlus} from "react-icons/bi";

export interface HeaderProps {
    children?: React.ReactNode | undefined;
    onSave?: React.FormEventHandler<HTMLFormElement> | undefined;
    onCreate?: React.Dispatch<void>;
    back?: string | undefined;
    delta?: number | undefined;
}

export const Header = ({children, onSave, onCreate, back, delta}: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className={`${style.header}`}>
            {
                <form onSubmit={onSave}>
                    {
                        back &&
                        <button title={"back"} type={"button"} className={`${generic.input}`}
                                onClick={() => back ? navigate(back) : delta ? navigate(delta) : navigate(-1)}>
                            <MdKeyboardReturn/>
                        </button>
                    }
                    {children}
                    {onSave &&
                        <button title={"save"} className={`${generic.input} ${generic.f_right}`} type="submit">
                            <MdSaveAs/>
                        </button>
                    }
                    {onCreate &&
                        <button title={"create"} className={`${generic.input} ${generic.f_right}`} onClick={onCreate}>
                            <BiPlus/>
                        </button>
                    }
                </form>
            }
        </div>
    )
}