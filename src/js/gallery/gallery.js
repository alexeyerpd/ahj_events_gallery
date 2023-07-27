import "./gallery.css";

export class Gallery {
    constructor(root) {
        this._root = root;
        if (typeof root === "string") {
            this._root = document.querySelector(root);
        }

        this.galleryList = null;
        this.galleryControlError = null;
    }

    init() {
        this.render();
        this.setElements();
        this.initEvents();
    }

    render() {
        this._root.insertAdjacentHTML("beforeend", this.getGalleryHTML());
    }

    getGalleryHTML() {
        return `
            <div class="gallery">
                <form class="gallery-form">
                    <div class="gallery-control-wrap">
                        <label class="gallery-control-label" for="title">Название</label>
                        <input class="gallery-control-input" type="text" id="title" name="title" placeholder="Введите название..." />
                    </div>
                    <div class="gallery-control-wrap">
                        <label class="gallery-control-label" for="url">Ссылка на изображение</label>
                        <input class="gallery-control-input" type="text" id="url" name="url" placeholder="Введите url..." />
                        <div class="gallery-control-error">Неверный URL изображения</div>
                    </div>
                    <button class="gallery-form-btn" type="submit">Добавить</button>
                </form>
                <div class="gallery-list"></div>
            </div>
        `;
    }

    initEvents() {
        this._root
            .querySelector(".gallery-form")
            .addEventListener("submit", this.onSubmit.bind(this));

        this.galleryList.addEventListener("click", this.onRemove.bind(this));

        Array.from(this._root.querySelectorAll(".gallery-control-input")).map(
            (input) => input.addEventListener("input", this.onInput.bind(this))
        );
    }

    setElements() {
        this.galleryList = this._root.querySelector(".gallery-list");
        this.galleryControlError = this._root.querySelector(
            ".gallery-control-error"
        );
    }

    onInput() {
        if (
            this.galleryControlError.classList.contains(
                "gallery-control-error_visible"
            )
        ) {
            this.galleryControlError.classList.remove(
                "gallery-control-error_visible"
            );
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const form = e.target;

        const fd = new FormData(form);

        const title = fd.get("title");
        const url = fd.get("url");

        if (!url || !title) {
            return;
        }

        const img = document.createElement("img");
        img.src = url;
        img.alt = title;

        const div = document.createElement("div");
        div.classList.add("gallery-list-item");

        const button = document.createElement("button");
        button.textContent = "X";
        button.classList.add("gallery-list-item-btn-remove");

        div.append(img, button);

        img.addEventListener("load", () => {
            this.galleryList.insertAdjacentElement("beforeend", div);
            form.reset();
        });
        img.addEventListener("error", () => {
            this.galleryControlError.classList.add(
                "gallery-control-error_visible"
            );
        });
        img.classList.add("gallery-list-item-image");
    }

    onRemove(e) {
        if (e.target.classList.contains("gallery-list-item-btn-remove")) {
            e.target.closest(".gallery-list-item").remove?.();
        }
    }
}
