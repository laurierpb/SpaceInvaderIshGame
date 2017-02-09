/* global fps, vitesse, vie, isBombFired, bossIsSpawn, control, onCanvasMove, canvas, setPlayerMoveVector */
var points = 0;
var interval = null;
function startGame(startGameValue) {
    setOptions(startGameValue);
    if(control === 1){
        canvas.addEventListener("mousemove", function(e){
            cursorPosition = getCursorPosition(e);
        }, false);
    }
    interval = setInterval(gameExecution, fps / vitesse);
}

var gameExecution = function () {
    setPlayerPosition();
    executePlayerAction();
    setPlayerProjectilePosition();

    addEnemyToList();
    setEnemyPosition();
    enemiesFire();
    setEnemiesFirePosition();

    setUpgradePosition();
    if (bossIsSpawn) {
        executeBossAction();
    }
    if (isBombFired) {
        executeBombAction();
    }
    clearCanvas();
    drawCanvas();
    if (vie === 0) {
        setStartMenu();
        clearInterval(interval);
    }
};