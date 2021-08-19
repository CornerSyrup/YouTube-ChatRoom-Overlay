let videoFrame: HTMLVideoElement;
let chatRoom: HTMLElement;

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
const isFullWidth = () => window.screen.width <= videoWidth();

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
        window
            .getComputedStyle(videoFrame.parentElement!, null)
            .getPropertyValue("width")
    );
//#endregion

//#region Helper functions
const warnNoVideoFrame = () =>
    console.warn("[YT Chat Overlay] Video container not found...");

const warnNoChatRoom = () =>
    console.warn("[YT Chat Overlay] Chat room not found...");
//#endregion


setTimeout(() => {
    overlay();
    // monitor
    new ResizeObserver((entries, observer) => {
        // Resize window might cause webpage re-render.
        // Then need to overlay again
        overlay();

        chatRoom.style.padding = isFullScreen() ? "7vh 0 8vh" : "0";
        chatRoom.style.height = isFullHeight() ? "100vh" : `${videoHeight()}px`;
        chatRoom.style.width = isFullWidth() ? "30vw" : "40%";
    }).observe(videoFrame);
    console.info("[YT Chat Overlay] Chat room has been overlay to video.");
}, 1 * 1000);
