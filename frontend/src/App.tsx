import {Wrapper} from "@/components/Wrapper.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Routing} from "@/components/Routing.tsx";

export function RedirectHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectPath = new URLSearchParams(location.search).get('url')
        if (redirectPath && redirectPath !== '/') {
            navigate(redirectPath, {replace: true});
        }
    }, [navigate]);

    return null;
}

export const App = () => {
    return (
        <Wrapper>
            <RedirectHandler/>
            <Routing />
        </Wrapper>
    )
}