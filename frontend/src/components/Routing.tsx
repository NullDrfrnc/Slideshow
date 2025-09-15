import {Routes, Route} from "react-router-dom";
import {ViewSlide} from "@/pages/Slides/ViewSlide.tsx";
import {SlideOverview} from "@/pages/Slides/SlideOverview.tsx";
import {EditSlide} from "@/pages/Slides/EditSlide.tsx";
import {CreateSlide} from "@/pages/Slides/CreateSlide.tsx";

export const Routing = () => {
    return (
        <Routes>
            <Route path={"slides"}>
                <Route index element={<SlideOverview/>}/>
                <Route path={"create"} element={<CreateSlide/>}/>
                <Route path={"edit/:id"} element={<EditSlide/>}/>
                <Route path={"view/:id"} element={<ViewSlide/>}/>
            </Route>
        </Routes>
    )
}