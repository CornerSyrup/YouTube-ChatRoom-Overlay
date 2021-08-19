/**
 * Steam video element.
 */
let videoFrame: HTMLVideoElement;
/**
 * Chat room custom element.
 */
let chatRoom: HTMLElement;

/**
 * Overlay the chat room onto video element.
 */
function overlay() {
    videoFrame = getVideoFrame();
    chatRoom = getChatRoom();

    if (videoFrame == null) {
        warnNoVideoFrame();
        return;
    } else if (chatRoom == null) {
        warnNoChatRoom();
        return;
    }

    videoFrame.parentElement!.appendChild(chatRoom);
}

//#region Getter/Setters
/**
 * Gets the steam video element.
 * @returns Video element of steam.
 */
const getVideoFrame = () =>
    document.querySelector(
        "video.video-stream.html5-main-video"
    )! as HTMLVideoElement;

/**
 * Gets the chat room element.
 * @returns Chat room element.
 */
const getChatRoom = () =>
    document.querySelector("ytd-live-chat-frame#chat")! as HTMLElement;

/**
 * Whether it is now in full screen.
 */
const isFullScreen = () => isFullWidth() && isFullHeight();

/**
 * Whether the video element takes the full height of screen.
 */
const isFullHeight = () => window.screen.height <= videoHeight();

/**
 * Whether the video element takes the full width of screen.
 */
const isFullWidth = () => window.screen.width <= videoContainerWidth();

/**
 * Gets the current height of video element.
 * @returns Current height of video element.
 */
const videoHeight = () =>
    Number.parseInt(
        window.getComputedStyle(videoFrame, null).getPropertyValue("height")
    );

/**
 * Gets the current width of video element.
 * @returns Current width of video element.
 */
const videoWidth = () =>
    Number.parseInt(
        window.getComputedStyle(videoFrame).getPropertyValue("width")
    );

const videoContainerWidth = () =>
    Number.parseInt(
        window
            .getComputedStyle(videoFrame.parentElement!)
            .getPropertyValue("width")
    );

/**
 * Gets the current width of chat room.
 * @returns Current width of chat room.
 */
const chatWidth = () =>
    Number.parseInt(
        window.getComputedStyle(chatRoom).getPropertyValue("width")
    );
//#endregion

//#region Helper functions
/**
 * Warn that video element not found. Potentially DOM structure changed.
 */
const warnNoVideoFrame = () =>
    console.warn("[YT Chat Overlay] Video container not found...");

/**
 * Warn that chat room not found. Potentially DOM structure changed.
 */
const warnNoChatRoom = () =>
    console.warn("[YT Chat Overlay] Chat room not found...");
//#endregion

//#region Resizer
const setChatPadding = (value?: string) =>
    (chatRoom.style.padding = isFullScreen() ? "7vh 0 8vh" : "0");
/**
 * Sets the width of the chat room.
 * @param value Width of chat room, in percent.
 * @returns
 */
const setChatWidth = (value: number) => {
    let w = (videoWidth() * value) / 100;
    chatRoom.style.width = `${w}px`;
    chrome.storage.local.get("float", (item) => {
        setChatFloat(item["float"], w);
    });
};

/**
 * Sets the height of the chat room.
 * @param value Height of chat room, in percent.
 */
const setChatHeight = (value: number) =>
    (chatRoom.style.height = isFullHeight()
        ? `${value}vh`
        : `${videoHeight()}px`);

/**
 * Sets the float for the chat room.
 * @param value Horizontal float of chat room, in percent to left.
 */
const setChatFloat = (value: number, width?: number) => {
    chatRoom.style.left = `${
        (videoWidth() - (width ?? chatWidth())) * (value / 100)
    }px`;
};

/**
 * Sets the opacity for the chat room.
 * @param value Opacity of chat room, in percent.
 */
const setChatOpacity = (value: number) =>
    (chatRoom.style.opacity = `${value / 100}`);

/**
 * Sets the chat comments' style.
 * @param value CSS style code for chat room comments.
 */
const setChatStyle = (value: string) => {};

/**
 * Resize handler map.
 */
const resizers: { [setting: string]: (value: any) => void } = {
    width: setChatWidth,
    height: setChatHeight,
    float: setChatFloat,
    opacity: setChatOpacity,
    comment: setChatStyle,
};
//#endregion

// YT render takes time, wait patiently
setTimeout(() => {
    overlay();

    chrome.storage.local.get(null, (items) => {
        Object.getOwnPropertyNames(items).forEach((prop) => {
            if (resizers[prop]) resizers[prop](items[prop]);
        });
    });

    // video size change monitor
    new ResizeObserver((entries, observer) => {
        // Resize window might cause webpage re-render.
        // Then need to overlay again
        overlay();

        chrome.storage.local.get(["width", "height"], (items) => {
            setChatPadding();
            setChatWidth(items["width"]);
            setChatHeight(items["height"]);
        });
    }).observe(videoFrame);

    // setting change monitor
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area != "local") {
            return;
        }

        Object.getOwnPropertyNames(changes).forEach((prop) =>
            resizers[prop](changes[prop].newValue)
        );
    });

    console.info("[YT Chat Overlay] Chat room has been overlay to video.");
}, 1 * 1000);
