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
}

function resizeChatRoom(frame) {
    console.log("[YTCO] Start of resize...");

    chatRoom.style.padding = isFullScreen() ? "7vh 0 8vh" : "0";

    console.log("[YTCO] End of resize...");
}

isFullScreen = () => window.screen.height <= videoHeight();

videoHeight = () =>
    Number.parseInt(
        window.getComputedStyle(videoFrame, null).getPropertyValue("height")
    );

setTimeout(overlay, 1 * 1000);
