/* global playerSpeedVector, control, setPlayerMoveVector, canvas */
function generatePlayerControl() {
    if (control === 0) {
        document.onkeydown = function (e) {
            if (
                    e.keyCode === 37 ||
                    e.keyCode === 38 ||
                    e.keyCode === 39 ||
                    e.keyCode === 40
                    ) {
                event.preventDefault();
                processPlayerMotion(e.keyCode, "down");
            } else if (e.keyCode === 32) {
                event.preventDefault();
            }
        };
        document.onkeyup = function (e) {
            if (
                    e.keyCode === 37 ||
                    e.keyCode === 38 ||
                    e.keyCode === 39 ||
                    e.keyCode === 40
                    ) {
                event.preventDefault();
                processPlayerMotion(e.keyCode, "up");
            } else if (e.keyCode === 32) {
                event.preventDefault();
                fireBomb();
            }
        };
    } else {
        document.onkeydown = function (e) {
            if (e.keyCode === 32) {
                event.preventDefault();
            }
        };
        document.onkeyup = function (e) {
            if (e.keyCode === 32) {
                event.preventDefault();
                fireBomb();
            }
        };
    }

}
