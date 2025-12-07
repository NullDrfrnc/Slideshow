import {Sidebar} from "@/components/Sidebar.tsx";
import {Outlet} from "react-router";
import {Wrapper} from "@/components/Wrapper.tsx";

import style from "#/components/Layout.module.css"

export const Layout = () => {
    return (
        <Wrapper>
            <Sidebar/>
            <main className={`${style.main}`}>
                <Outlet/>
            </main>
        </Wrapper>
    )
}