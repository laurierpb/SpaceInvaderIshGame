/* global playerNormalProjectileList, player, playerMissileProjectileList, canvas, bombExplosion, canvasHeight, difficulte */

var enemyList = [];
var enemyProjectileList = [];
var enemyStartingYPosition = 5;
var enemy = {
    larg: 40,
    haut: 20,
    color: "rgba(255, 0, 0, 1)",
    direction: 1,
    fireIntervale: 0,
    image: "enemy1",
    hp: 1,
    maxHp:1
};
var enemyProjectile = {
    larg: 5,
    haut: 5,
    color: "rgba(255, 255, 0, 1)",
    moveX: 0,
    moveY: 0
};
var enemyMoveVectorHorizontal = 5;
var enemyVerticalMovement = 20;
var enemySpawnIntervale = 0;
var enemyBaseSpawnIntervale = 10;
var enemeyProjSpeed = 10;
var enemyFireRate = [20, 40];
var enemyAimOffset = 30;

var enemyPoints = 10;

function setEnemyPosition() {
    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].x += enemyMoveVectorHorizontal * enemyList[i].direction;
        if (enemyList[i].x > canvas.width - enemy.larg / 2) {
            enemyList[i].x = canvas.width - enemy.larg / 2;
            enemyList[i].y += enemyVerticalMovement;
            enemyList[i].direction = enemyList[i].direction * -1;
        }
        if (enemyList[i].x < 0) {
            enemyList[i].x = 0;
            enemyList[i].y += enemyVerticalMovement;
            enemyList[i].direction = enemyList[i].direction * -1;
        }
        if (enemyList[i].y > canvas.height - enemy.haut) {
            enemyList.splice(i, 1);
        }
        checkForColision(i);
    }
}
function checkForColision(i) {
    for (var j = 0; j < playerMissileProjectileList.length; j++) {
        if (isHit(enemyList[i], playerMissileProjectileList[j])) {
            if (!enemyHit(enemyList, i)) {
                playerMissileProjectileList.splice(j, 1);
                j--;
            } else {
                deleteMissile(enemyList[i]);
            }
        }
    }
    for (var j = 0; j < playerNormalProjectileList.length; j++) {
        if (isHit(enemyList[i], playerNormalProjectileList[j])) {
            if (enemyHit(enemyList, i)) {
                deleteMissile(enemyList[i]);
            }

            playerNormalProjectileList.splice(j, 1);
            break;
        }
    }
    if (enemyList[i] !== undefined) {
        if (enemyList[i].y > canvasHeight / 2 - bombExplosion.haut) {
            enemyHit(enemyList, i);
        }
    }
}
function enemyHit(enemyList, i) {
    if (enemyList[i].hp <= 1) {
        deleteMissile(enemyList[i]);
        enemyList.splice(i, 1);
        addPoints(enemy.hp * enemyPoints);
        return true;
    } else {
        enemyList[i].hp--;
        return false;
    }
}

function addEnemyToList() {
    if (enemySpawnIntervale <= 0) {
        var randomXValue = Math.random() * (canvas.width - enemy.larg / 2 - 0) + 0;
        do {
            randomXValue--;
            if (randomXValue < 0) {
                return;
            }
        } while (canEnemyNotSpawn(randomXValue));
        var hp = generateEnemyHp();
        enemyList.push({
            x: randomXValue,
            y: enemyStartingYPosition,
            larg: enemy.larg,
            haut: enemy.haut,
            color: enemy.color,
            direction: enemy.direction,
            fireIntervale: Math.random() * (enemyFireRate[1] - enemyFireRate[0]) + enemyFireRate[0],
            image: "enemy1",
            hp: hp,
            maxHp:hp
        });
        enemySpawnIntervale = enemyBaseSpawnIntervale;
    }
    enemySpawnIntervale -= 1;
}
function generateEnemyHp() {
    if (difficulte === 2 || difficulte === 1) {
        return Math.ceil(Math.random() * (enemy.hp - 0) + 0);
    }else{
        return enemy.hp;
    }
}
function canEnemyNotSpawn(xValue) {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].y === enemyStartingYPosition &&
                (xValue < enemyList[i].x && xValue + enemy.larg > enemyList[i].x ||
                        enemyList[i].x < xValue && enemyList[i].x + enemy.larg > xValue)) {
            return true;
        }
    }
    return false;
}

function enemiesFire() {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].fireIntervale <= 0) {
            addEnemyProjToList(enemyList[i]);
            enemyList[i].fireIntervale = Math.random() * (enemyFireRate[1] - enemyFireRate[0]) + enemyFireRate[0];
        } else {
            enemyList[i].fireIntervale -= 1;
        }
    }
}

function addEnemyProjToList(enemy) {
    var playerX = player.x - player.larg / 2;
    var playerY = player.y - player.larg / 2;
    var projX = enemy.x;
    var projY = enemy.y;

    var x = playerX - projX;
    var y = playerY - projY;
    x = Math.random() * ((x + enemyAimOffset) - (x - enemyAimOffset)) + (x - enemyAimOffset);
    var z = Math.sqrt(x * x + y * y) / enemeyProjSpeed;

    enemyProjectileList.push({
        x: enemy.x + enemy.larg / 2,
        y: enemy.y + enemy.haut,
        larg: enemyProjectile.larg,
        haut: enemyProjectile.haut,
        color: "rgba(255, 255, 0, 1)",
        moveX: x / z,
        moveY: y / z
    });
}
function setEnemiesFirePosition() {
    for (var i = 0; i < enemyProjectileList.length; i++) {
        if (enemyProjectileList[i].y > 500 ||
                enemyProjectileList[i].x < 0 ||
                enemyProjectileList[i].x > 500) {
            enemyProjectileList.splice(i, 1);
        } else {
            enemyProjectileList[i].x += enemyProjectileList[i].moveX;
            enemyProjectileList[i].y += enemyProjectileList[i].moveY;
        }
    }
    playerHit();
}