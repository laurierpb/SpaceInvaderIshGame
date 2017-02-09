/* global canvasWidth, canvasHeight, playerNormalProjectileList, playerMissileProjectileList */

var bossProjectileList = [];
var bossLevel = 1;
var bossIsSpawn = false;
var isBossFireingTwo = false;
var isBossFireingThree = false;
var bossBaseHp = 60;
var projectileWallFire;

var degreeFireTwo = -90;
var fireTwoRotationSpeed = 10;

var degreeFireThree = 0;
var fireThreeRotationSpeed = 4;

var bossMoveSpeed = 2;
var bossProjectileSpeedOne = 3;
var bossProjectileSpeedTwo = 5;
var bossProjectileSpeedThree = 5;
var wallMoveSpeed = 2;
var bossFireingSpeed = 5;

var bossProjectileList = [];
var bossProjectileWallList = [];
var bossFireIntervale = 30;
var bossBaseFireIntervale = 70;

var canFire = 0;
var boss = {
    x: (canvasWidth - 100) / 2,
    y: -50,
    larg: 100,
    haut: 50,
    color: "rgba(255, 0, 0, 1)",
    image: "enemy1",
    direction: 1,
    hp: 30,
    maxHp: 30
};
var bossProjectileOne = {
    larg: 5,
    haut: 5,
    color: "rgba(255, 255, 0, 1)",
    moveX: 0,
    moveY: 0
};
var bossProjectileWall = {
    x: 0,
    y: 0,
    larg: canvasWidth / 3,
    haut: canvasWidth,
    color: "rgba(255, 255, 0, 0.5)",
    moveX: 0,
    direction: 1
};
function executeBossAction() {
    setBossPosition();
    setBossProjectilePosition();
    fireBossProjectile();
    checkBossColision();
    return;
}
function checkBossColision() {
    for (var i = 0; i < playerNormalProjectileList.length; i++) {
        if (isHit(playerNormalProjectileList[i], boss)) {
            bossHit();
            break;
        }
    }
    for (var i = 0; i < playerMissileProjectileList.length; i++) {
        if (isHit(playerMissileProjectileList[i], boss)) {
            bossHit();
            break;
        }
    }
    return;
}
function bossHit() {
    boss.hp--;
    if (boss.hp <= 0) {
        bossIsSpawn = false;
        bossProjectileList = [];
        bossProjectileWallList = [];
        enemySpawnIntervale = 0;
    }
    return;
}
function fireBossProjectile() {
    if (bossFireIntervale > 0) {
        bossFireIntervale--;
    } else {
        bossFireIntervale = bossBaseFireIntervale;
        isBossFireingTwo = false;
        var typeFire = Math.floor(Math.random() * 4);
        
        if (typeFire === 0) {
            fireTypeOne();
            bossFireIntervale -= bossBaseFireIntervale / 2;
        } else if (typeFire === 1) {
            isBossFireingTwo = true;
        } else if (typeFire === 2) {
            degreeFireThree = 0;
            isBossFireingThree = true;
        } else if (typeFire === 3) {
            fireWall();
            bossFireIntervale -= bossBaseFireIntervale / 2;
        }
    }
    if (isBossFireingTwo) {
        if (canFire % bossFireingSpeed === 0) {
            fireTypeTwo(degreeFireTwo);
            degreeFireTwo += fireTwoRotationSpeed;
        }
    }
    if (isBossFireingThree) {
        if (canFire % bossFireingSpeed === 0) {
            if (degreeFireThree < 70 && degreeFireThree > 10) {
                fireTypeThree(degreeFireThree);
            }
            if (degreeFireThree - 50 < 25 && degreeFireThree - 50 > -40) {
                fireTypeThree(degreeFireThree - 50);
            }
            if (degreeFireThree - 100 < -45 && degreeFireThree - 100 > -90) {
                fireTypeThree(degreeFireThree - 100);
            }
            degreeFireThree += fireThreeRotationSpeed;
        }
    }
    canFire++;
    return;
}
function fireWall() {
    var direction = Math.floor(Math.random() * 2);
    var x;
    if (direction === 0) {
        direction = 1;
        x = -canvasWidth / 3;
    } else {
        direction = -1;
        x = canvasWidth;
    }
    bossProjectileWallList.push({
        x: x,
        y: 0,
        larg: canvasWidth / 3,
        haut: canvasWidth,
        color: bossProjectileWall.color,
        direction: direction
    });
    return;
}
function setBossPosition() {
    if (boss.y < 10) {
        boss.y += bossMoveSpeed - bossMoveSpeed / 3;
    } else {
        if (boss.x + boss.larg > canvasWidth) {
            boss.x = canvasWidth - boss.larg;
            boss.direction *= -1;
        } else if (boss.x < 0) {
            boss.x = 0;
            boss.direction *= -1;
        }
        boss.x += bossMoveSpeed * boss.direction;
    }
    return;
}
function setBossProjectilePosition() {
    for (var i = 0; i < bossProjectileList.length; i++) {
        if (
                bossProjectileList[i].y > canvasHeight ||
                bossProjectileList[i].x < 0 ||
                bossProjectileList[i].x > canvasWidth
                ) {
            bossProjectileList.splice(i, 1);
            i--;
        } else {
            bossProjectileList[i].x += bossProjectileList[i].moveX;
            bossProjectileList[i].y += bossProjectileList[i].moveY;
        }
    }
    for (var i = 0; i < bossProjectileWallList.length; i++) {
        if (bossProjectileWallList[i].x < 0 ||
                bossProjectileWallList[i].x > canvasWidth - canvasWidth / 3) {
            bossProjectileWallList[i].x += wallMoveSpeed * bossProjectileWallList[i].direction;
        } else {
            bossProjectileWallList.splice(i, 1);
        }
    }
    return;
}
function fireTypeOne() {
    var startingPosition = [
        boss.x + boss.larg / 2,
        boss.y + boss.haut
    ];
    for (var j = -90; j <= 90; j += 10) {
        var i = toRadians(j);
        var op = Math.sin(i) * 1;
        var ad = Math.sqrt(1 - op * op);
        var speedVector = generateNormalisedSpeed(
                op * bossProjectileSpeedOne,
                ad * bossProjectileSpeedOne,
                bossProjectileSpeedOne);
        var projectileToAdd = {
            x: startingPosition[0],
            y: startingPosition[1],
            haut: bossProjectileOne.haut,
            larg: bossProjectileOne.larg,
            moveX: speedVector[0],
            moveY: speedVector[1],
            color: bossProjectileOne.color
        };
        bossProjectileList.push(projectileToAdd);
    }
    return;
}
function fireTypeTwo(i) {
    i = toRadians(i);
    var startingPosition = [
        boss.x + boss.larg / 2,
        boss.y + boss.haut
    ];
    var op = Math.sin(i);
    var ad = Math.sqrt(1 - (op * op));
    var speedVector = generateNormalisedSpeed(
            op * bossProjectileSpeedTwo,
            ad * bossProjectileSpeedTwo,
            bossProjectileSpeedTwo);
    var projectileToAdd = {
        x: startingPosition[0],
        y: startingPosition[1],
        haut: bossProjectileOne.haut,
        larg: bossProjectileOne.larg,
        moveX: speedVector[0],
        moveY: speedVector[1],
        color: bossProjectileOne.color
    };
    bossProjectileList.push(projectileToAdd);
    return;
}
function fireTypeThree(i) {
    i = toRadians(i);
    var startingPosition = [
        boss.x + boss.larg / 2,
        boss.y + boss.haut
    ];
    var op = Math.sin(i);
    var ad = Math.sqrt(1 - (op * op));
    var speedVector = generateNormalisedSpeed(
            op * bossProjectileSpeedThree,
            ad * bossProjectileSpeedThree,
            bossProjectileSpeedThree);
    var projectileToAdd = {
        x: startingPosition[0],
        y: startingPosition[1],
        haut: bossProjectileOne.haut,
        larg: bossProjectileOne.larg,
        moveX: speedVector[0],
        moveY: speedVector[1],
        color: bossProjectileOne.color
    };
    bossProjectileList.push(projectileToAdd);
    return;
}
function spawnBoss() {
    boss.x = (canvasWidth - boss.larg) / 2;
    boss.y = -50;
    boss.hp = bossBaseHp * bossLevel;
    boss.maxHp = bossBaseHp * bossLevel;
    bossFireIntervale = 30;

    enemyList = [];
    upgradeList = [];
    playerMissileProjectileList = [];
    playerNormalProjectileList = [];
    enemyProjectileList = [];
    enemySpawnIntervale = 1000000;
    bossIsSpawn = true;
    bossLevel++;
    return;
}