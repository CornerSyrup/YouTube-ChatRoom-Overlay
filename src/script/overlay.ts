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

const getVideoFrame = () =>
    document.querySelector(
        "video.video-stream.html5-main-video"
    )! as HTMLVideoElement;

const getChatRoom = () =>
    document.querySelector("ytd-live-chat-frame#chat")! as HTMLElement;

const warnNoVideoFrame = () =>
    console.warn("[YT Chat Overlay] Video container not found...");

const warnNoChatRoom = () =>
    console.warn("[YT Chat Overlay] Chat room not found...");

const isFullScreen = () => isFullWidth() && isFullHeight();

const isFullHeight = () => window.screen.height <= videoHeight();

const isFullWidth = () => window.screen.width <= videoWidth();

const videoHeight = () =>
    Number.parseInt(
        window.getComputedStyle(videoFrame, null).getPropertyValue("height")
    );

const videoWidth = () =>
    Number.parseInt(
        window
            .getComputedStyle(videoFrame.parentElement!, null)
            .getPropertyValue("width")
    );

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
