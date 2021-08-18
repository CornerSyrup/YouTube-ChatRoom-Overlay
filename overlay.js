let videoContainer;
let chatRoom;

function overlay() {
    videoContainer = document.querySelector(
        "video.video-stream.html5-main-video"
    )?.parentElement;
    chatRoom = document.querySelector("ytd-live-chat-frame#chat");

    if (videoContainer == null) {
        console.warn("[YT Chat Overlay] Video container not found...");
        return;
    } else if (chatRoom == null) {
        console.warn("[YT Chat Overlay] Chat room not found...");
        return;
    } else {
        console.info("[YT Chat Overlay] Chat room has been overlay to video.");
        videoContainer.appendChild(chatRoom);
    }
}

setTimeout(overlay, 1 * 1000);
