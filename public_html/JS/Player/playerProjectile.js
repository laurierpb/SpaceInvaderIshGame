/* global canvasHeight, upgradeValueList, player, enemyList, canvasWidth, playerMissileProjectileSpeed, boss, bossIsSpawn */
var bomb = {
    larg: 25,
    haut:25,
    color: "rgba(255, 255, 255, 1)",
    moveVector: [0, 0],
    frameLeftBeforeImpact: 0,
    image:"bomb"
};
var bombExplosion = {
    x:0, 
    y:0,
    larg: 0,
    haut: 0,
    color: "rgba(255, 255, 255, 0.75)",
    explosionTime: 0
};
var bombBaseFrameLeftBeforeImpact = 24;
var bombBaseExplosionTime = 24;
var isBombFired = false;
var bombLeft = 0;

var playerNormalProjectile = {
    larg: 5,
    haut: 5,
    color: "rgba(255, 0, 0, 0.25)",
    velX: 0,
    velY: 15
};
playerNormalProjectileDefault = 5;

var playerMissileProjectile = {
    larg: 10,
    haut: 20,
    color: "rgba(255, 0, 0, 0.25)",
    velX: 0,
    velY: 0,
    target: null
};
var playerLazerProjectile = {
    larg: 10,
    haut: canvasHeight,
    color: "rgba(255, 0, 255, 0.25)",
    duration: 5
};

var playerNormalProjectileList = [];
var playerMissileProjectileList = [];
var playerLazerProjectileList = [];

var baseFireingIntervale = 10;
var baseMultishotIntervale = 40;
var baseLazerIntervale = 50;
var baseMissileIntervale = 50;
var playerMissileProjectileSpeed = 15;


function addNormalShotToList() {
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - (playerNormalProjectile.larg + player.upgrades[0] * upgradeValueList[0]) / 2,
        y: player.y,
        larg: (playerNormalProjectile.larg) + upgradeValueList[0] * player.upgrades[0],
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX,
        velY: playerNormalProjectile.velY
    });
}
function addMultishotToList() {
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerNormalProjectile.larg,
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX + 3,
        velY: playerNormalProjectile.velY
    });
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerNormalProjectile.larg,
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX - 3,
        velY: playerNormalProjectile.velY
    });
}
function addMissileShotToList() {
    var target;
    if (enemyList.length > 0){
        target = enemyList[Math.floor(Math.random() * enemyList.length)];
    }else if(bossIsSpawn){
        target = boss;
    }else{
        return;
    }
    playerMissileProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerMissileProjectile.larg,
        haut: playerMissileProjectile.haut,
        color: playerMissileProjectile.color,
        velX: playerMissileProjectile.velX,
        velY: playerMissileProjectile.velY,
        target: target
    });
}
function fireBomb() {
    if (bombLeft > 0 && !isBombFired) {
        bombLeft--;
        bomb.x = player.x;
        bomb.y = player.y;
        bomb.moveVector[0] = (canvasWidth / 2 - player.x) / bombBaseFrameLeftBeforeImpact;
        bomb.moveVector[1] = (canvasHeight / 2 - player.y) / bombBaseFrameLeftBeforeImpact;
        bomb.frameLeftBeforeImpact = bombBaseFrameLeftBeforeImpact;
        isBombFired = true;
    }
}
function executeBombAction() {
    bomb.x += bomb.moveVector[0];
    bomb.y += bomb.moveVector[1];
    bomb.frameLeftBeforeImpact--;
    
    if (bomb.frameLeftBeforeImpact <= 0) {
        isBombFired = false;
        enemyProjectileList = [];
        bombExplosion.explosionTime = bombBaseExplosionTime;
        bombExplosion.x = canvasWidth / 2;
        bombExplosion.y = canvasHeight / 2;
        bombExplosion.larg = 0;
    }
}

function setPlayerProjectilePosition() {
    for (var i = 0; i < playerNormalProjectileList.length; i++) {
        playerNormalProjectileList[i].y -= playerNormalProjectileList[i].velY;
        playerNormalProjectileList[i].x += playerNormalProjectileList[i].velX;
        if (playerNormalProjectileList[i].y < -10) {
            playerNormalProjectileList.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < playerMissileProjectileList.length; i++) {
        setMissileDirection(playerMissileProjectileList[i]);

        playerMissileProjectileList[i].y -= playerMissileProjectileList[i].velY;
        playerMissileProjectileList[i].x += playerMissileProjectileList[i].velX;

        if (playerMissileProjectileList[i].y < -10) {
            playerMissileProjectileList.splice(i, 1);
            i--;
        }
    }
}
function setMissileDirection(missile) {
    var target = missile.target;
    var x = target.x + target.larg / 2 - missile.x;
    var y = missile.y - target.y + target.haut / 2;
    var normXY = (generateNormalisedSpeed(x, y, playerMissileProjectileSpeed));
    missile.velX = normXY[0];
    missile.velY = normXY[1];
}
function deleteMissile(target) {
    for (var i = 0; i < playerMissileProjectileList.length; i++) {
        if (playerMissileProjectileList[i].target === target) {
            playerMissileProjectileList.splice(i, 1);
            i--;
        }
    }
}