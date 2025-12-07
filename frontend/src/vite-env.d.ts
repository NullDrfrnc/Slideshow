/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import svgr from "vite-plugin-svgr";

svgr({
    include: "**/*.svg?react"
})