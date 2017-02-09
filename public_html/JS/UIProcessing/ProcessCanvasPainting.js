/* global ctx, canvas, playerNormalProjectileList, player, enemyList, enemyProjectileList, upgradeList, playerMissileProjectileList, enemy, points, vie, showPoints, bombExplosion, bomb, isBombFired, bombLeft, bossIsSpawn, boss, bossProjectileList, bossProjectileWallList */

var canvas = document.getElementById('gameCanvas');
var canvasHeight = 500;
var canvasWidth = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext("2d");

function drawRectangleElement(element) {
    for (var i = 0; i < element.length; i++) {
        ctx.fillStyle = element[i].color;
        ctx.fillRect(
                element[i].x,
                element[i].y,
                element[i].larg,
                element[i].haut);
    }
}
function drawEnemyHpBar(element) {
    for (var i = 0; i < element.length; i++) {
        if (element[i].hp > 1) {
            var percentageHP = element[i].hp / element[i].maxHp;
            var temp = {
                x: element[i].x,
                y: element[i].y - 5,
                larg: element[i].larg * percentageHP,
                haut: 5,
                color: enemy.color
            };
            drawRectangleElement([temp]);
        }
    }
}
function drawTriangleElement(elements) {
    for (var i = 0; i < elements.length; i++) {
        var coord = generatePointsForTrianglePointing(elements[i], elements[i].target);
        ctx.beginPath();
        ctx.moveTo(
                coord[0][0],
                coord[0][1]
                );
        ctx.lineTo(
                coord[1][0],
                coord[1][1]
                );
        ctx.lineTo(
                coord[2][0],
                coord[2][1]
                );
        ctx.closePath();
        // the outline

        // the fill color
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
    }
}
function drawCircleElement(elements) {
    for (var i = 0; i < elements.length; i++) {
        ctx.beginPath();
        ctx.arc(elements[i].x, elements[i].y, elements[i].larg, 0, 2 * Math.PI);

        // the fill color
        ctx.fillStyle = elements[i].color;
        ctx.fill();
    }
}
function drawImageToCanvas(elements) {
    for (var i = 0; i < elements.length; i++) {
        var img = document.getElementById(elements[i].image);
        ctx.drawImage(img, elements[i].x, elements[i].y, elements[i].larg, elements[i].haut);
    }
}
function drawShield(element) {
    ctx.beginPath();
    ctx.arc(
            player.x + player.larg / 2,
            player.y + player.larg / 2 + 5,
            35,
            Math.PI * 1.15,
            Math.PI * (1.85)
            );
    ctx.lineWidth = 2 * player.upgrades[5];
    ctx.strokeStyle = "rgba(0, 255, 255, " + element + ")";
    ctx.stroke();
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawMenu(elements) {
    for (var i = 0; i < elements.length; i++) {
        ctx.font = elements[i].font;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(
                elements[i].fillText,
                elements[i].x + elements[i].larg / 2,
                elements[i].y + elements[i].haut / 1.5
                );
    }
}
function drawPoints() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(
            "Points : " + points,
            canvasWidth - 100,
            30);
}
function drawGameGUI() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(
            "Vie : " + vie,
            50,
            30);

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(
            "Bomb : " + bombLeft,
            70,
            60);
}
function drawCanvas() {
    drawImageToCanvas([player]);
    drawCircleElement(playerNormalProjectileList);
    drawTriangleElement(playerMissileProjectileList);
    drawImageToCanvas(enemyList);
    drawRectangleElement(enemyProjectileList);
    drawImageToCanvas(upgradeList);
    drawShield(player.upgrades[5] / 10);

    drawGameGUI();
    if (showPoints) {
        drawPoints();
    }
    if (enemy.hp > 1) {
        drawEnemyHpBar(enemyList);
    }

    if (isBombFired) {
        drawImageToCanvas([bomb]);
    }
    if (bossIsSpawn) {
        drawImageToCanvas([boss]);
        drawEnemyHpBar([boss]);
        drawRectangleElement(bossProjectileList);
        drawRectangleElement(bossProjectileWallList);
    }
    if (bombExplosion.explosionTime > 0) {
        drawCircleElement([bombExplosion]);

        bombExplosion.explosionTime--;
        bombExplosion.larg += 20;
        bombExplosion.haut += 20;
    } else {
        bombExplosion.larg = 0;
        bombExplosion.haut = 0;
    }
}