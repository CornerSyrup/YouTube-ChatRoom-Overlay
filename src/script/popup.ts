const settings = ["width", "height", "float", "opacity", "comment"];

chrome.storage.local.get(settings, (values) => {
    settings.forEach((setting) => {
        (document.getElementById(setting) as HTMLInputElement).value =
            values[setting];
    });
});

document.getElementById("width")!.addEventListener("change", (ev) =>
    chrome.storage.local.set({
        width: (ev.target! as HTMLInputElement).value,
    })
);

document.getElementById("height")!.addEventListener("change", (ev) =>
    chrome.storage.local.set({
        height: (ev.target! as HTMLInputElement).value,
    })
);

document.getElementById("float")!.addEventListener("change", (ev) =>
    chrome.storage.local.set({
        float: (ev.target! as HTMLInputElement).value,
    })
);

document.getElementById("opacity")!.addEventListener("change", (ev) =>
    chrome.storage.local.set({
        opacity: (ev.target! as HTMLInputElement).value,
    })
);

document.getElementById("comment")!.addEventListener("change", (ev) =>
    chrome.storage.local.set({
        comment: (ev.target! as HTMLTextAreaElement).value,
    })
);
