import "./app.css";

import { Gallery } from "./gallery/gallery";

document.addEventListener("DOMContentLoaded", () => {
    const gallery = new Gallery("#root");
    gallery.init();
});
