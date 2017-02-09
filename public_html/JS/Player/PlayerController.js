/* global enemyProjectileList, canvasHeight, upgradeValueList, enemyList, canvas, vie, canvasWidth, baseFireingIntervale, baseMultishotIntervale, baseMissileIntervale, bossProjectileList, bossIsSpawn, bossProjectileWallList, cursorPosition, control */

/*
 * upgrade:
 * 0 = grosseur de balle
 * 1 = speed
 * 2 = vitesse de tire
 * 3 = multishot
 * 4 = missile
 * 5 = shield
 */
var player = {
    x: 245,
    y: 490,
    larg: 18,
    haut: 30,
    color: "rgba(255, 255, 255, 1)",
    fireingIntervale: 0,
    upgrades: [0, 0, 0, 0, 0, 0],
    image: "battleShip",
    life: 1
};

var maxY = canvas.height - player.haut;
var maxX = canvas.width - player.larg / 2;
var moveSpeed = 0;
var baseMoveSpeed = 10;
var playerSpeedVector = {x: 0, y: 0};

function setPlayerPosition() {
    if (control === 0) {
        setPlayerPosition0();
    } else if (control === 1) {
        setPlayerPosition1();
    }
}
function setPlayerPosition0() {
    var normalisedSpeed = generateNormalisedSpeed(
            playerSpeedVector.x,
            playerSpeedVector.y,
            moveSpeed);
    player.x += normalisedSpeed[0];
    player.y += normalisedSpeed[1];

    if (player.x > maxX) {
        player.x = maxX;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y > maxY) {
        player.y = maxY;
    }
    if (player.y < 0) {
        player.y = 0;
    }
}

function setPlayerPosition1() {
    var speed = baseMoveSpeed + player.upgrades[1] * upgradeValueList[1];
    playerSpeedVector.x = cursorPosition[0] - player.x;
    playerSpeedVector.y = cursorPosition[1] - player.y;
    var normalisedSpeed = generateNormalisedSpeed(
            playerSpeedVector.x,
            playerSpeedVector.y,
            speed);
    var playerXOldPosition = player.x;
    var playerYOldPosition = player.y;
    player.x += normalisedSpeed[0];
    player.y += normalisedSpeed[1];

    if (player.x > maxX) {
        player.x = maxX;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y > maxY) {
        player.y = maxY;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if(playerXOldPosition-cursorPosition[0] < 0 && player.x - cursorPosition[0] > 0 ||
            playerXOldPosition-cursorPosition[0] > 0 && player.x - cursorPosition[0] < 0){
        player.x = cursorPosition[0];
    }
    if(playerYOldPosition-cursorPosition[1] < 0 && player.y - cursorPosition[1] > 0 ||
            playerYOldPosition-cursorPosition[1] > 0 && player.y - cursorPosition[1] < 0){
        player.y = cursorPosition[1];
    }

}
function playerHit() {
    for (var i = 0; i < enemyProjectileList.length; i++) {
        if (isHit(player, enemyProjectileList[i])) {
            if (player.upgrades[5] > 0) {
                player.upgrades[5]--;
                enemyProjectileList.splice(i, 1);
                i--;
            } else {
                if (vie >= 1) {
                    playerLostLife();
                }
            }
            break;
        }
    }
    if (bossIsSpawn) {
        for (var i = 0; i < bossProjectileList.length; i++) {
            if (isHit(player, bossProjectileList[i])) {
                if (player.upgrades[5] > 0) {
                    player.upgrades[5]--;
                    bossProjectileList.splice(i, 1);
                    i--;
                } else {
                    if (vie >= 1) {
                        playerLostLife();
                    }
                }
                break;
            }
        }
        for (var i = 0; i < bossProjectileWallList.length; i++) {
            if (isHit(player, bossProjectileWallList[i])) {
                if (player.upgrades[5] > 0) {
                    player.upgrades[5]--;
                    bossProjectileWallList.splice(i, 1);
                    i--;
                } else {
                    if (vie >= 1) {
                        playerLostLife();
                    }
                }
                break;
            }
        }
    }
}
function processPlayerMotion(key, event) {
    moveSpeed = baseMoveSpeed + upgradeValueList[1] * player.upgrades[1];
    if (playerSpeedVector.x > 0) {
        playerSpeedVector.x = moveSpeed;
    } else if (playerSpeedVector.x < 0) {
        playerSpeedVector.x = -moveSpeed;
    }
    if (playerSpeedVector.y > 0) {
        playerSpeedVector.y = moveSpeed;
    } else if (playerSpeedVector.y < 0) {
        playerSpeedVector.y = -moveSpeed;
    }

    if (event === 'down') {
        if (key === 37) {
            if (playerSpeedVector.x >= 0) {
                playerSpeedVector.x -= moveSpeed;
            }
        }
        if (key === 39) {
            if (playerSpeedVector.x <= 0) {
                playerSpeedVector.x += moveSpeed;
            }
        }
        if (key === 38) {
            if (playerSpeedVector.y >= 0) {
                playerSpeedVector.y -= moveSpeed;
            }
        }
        if (key === 40) {
            if (playerSpeedVector.y <= 0) {
                playerSpeedVector.y += moveSpeed;
            }
        }
    }
    if (event === "up") {
        if (key === 37) {
            if (playerSpeedVector.x <= 0) {
                playerSpeedVector.x += moveSpeed;
            }
        }
        if (key === 39) {
            if (playerSpeedVector.x >= 0) {
                playerSpeedVector.x -= moveSpeed;
            }
        }
        if (key === 38) {
            if (playerSpeedVector.y <= 0) {
                playerSpeedVector.y += moveSpeed;
            }
        }
        if (key === 40) {
            if (playerSpeedVector.y >= 0) {
                playerSpeedVector.y -= moveSpeed;
            }
        }
    }
}

function executePlayerAction() {
    var normalFireingInterval = (baseFireingIntervale - player.upgrades[2] * upgradeValueList[2]);
    if (player.fireingIntervale % normalFireingInterval === 0) {
        addNormalShotToList();
    }
    if (player.upgrades[3] > 0) {
        var multishotFireingIntervale = (baseMultishotIntervale - player.upgrades[3] * upgradeValueList[3]);
        if (player.fireingIntervale % multishotFireingIntervale === 0) {
            addMultishotToList();
        }
    }
    if (player.upgrades[4] > 0) {
        var missileFireingIntervale = (baseMissileIntervale - player.upgrades[4] * upgradeValueList[4]);
        if (player.fireingIntervale % missileFireingIntervale === 0) {
            addMissileShotToList();
        }
    }
    if (player.fireingIntervale === 1000000) {
        player.fireingIntervale = 0;
    } else {
        player.fireingIntervale++;
    }
}
