let videoFrame;
let chatRoom;

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

    videoFrame.parentElement.appendChild(chatRoom);
}

function resizeChatRoom(frame) {
    // Resize window might cause webpage re-render.
    // Then need to overlay again
    overlay();

    chatRoom.style.padding = isFullScreen() ? "7vh 0 8vh" : "0";
    chatRoom.style.height = isFullHeight() ? "100vh" : `${videoHeight()}px`;
    chatRoom.style.width = isFullWidth() ? "30vw" : "40%";
}

getVideoFrame = () =>
    document.querySelector("video.video-stream.html5-main-video");

getChatRoom = () => document.querySelector("ytd-live-chat-frame#chat");

warnNoVideoFrame = () =>
    console.warn("[YT Chat Overlay] Video container not found...");

warnNoChatRoom = () => console.warn("[YT Chat Overlay] Chat room not found...");

isFullScreen = () => isFullWidth() && isFullHeight();

isFullHeight = () => window.screen.height <= videoHeight();

isFullWidth = () => window.screen.width <= videoWidth();

videoHeight = () =>
    Number.parseInt(
        window.getComputedStyle(videoFrame, null).getPropertyValue("height")
    );

videoWidth = () =>
    Number.parseInt(
        window
            .getComputedStyle(videoFrame.parentElement, null)
            .getPropertyValue("width")
    );

setTimeout(() => {
    overlay();
    // monitor
    new ResizeObserver(resizeChatRoom).observe(videoFrame);
    console.info("[YT Chat Overlay] Chat room has been overlay to video.");
}, 1 * 1000);

function debugLog(...values) {
    console.log(`[YTCO] ${values}`);
}
