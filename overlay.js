let videoFrame;
let chatRoom;

function overlay() {
    videoFrame = document.querySelector("video.video-stream.html5-main-video");
    chatRoom = document.querySelector("ytd-live-chat-frame#chat");

    if (videoFrame == null) {
        console.warn("[YT Chat Overlay] Video container not found...");
        return;
    } else if (chatRoom == null) {
        console.warn("[YT Chat Overlay] Chat room not found...");
        return;
    }

    console.info("[YT Chat Overlay] Chat room has been overlay to video.");
    videoFrame.parentElement.appendChild(chatRoom);

    resizeChatRoom(videoFrame);
    new ResizeObserver(resizeChatRoom).observe(videoFrame);
}

function resizeChatRoom(frame) {
    chatRoom.style.padding = isFullScreen() ? "7vh 0 8vh" : "0";
    chatRoom.style.height = isFullHeight() ? "100vh" : `${videoHeight()}px`;
    chatRoom.style.width = isFullWidth() ? "30vw" : "40%";
}

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

setTimeout(overlay, 1 * 1000);

function debugLog(...values) {
    console.log(`[YTCO] ${values}`);
}
