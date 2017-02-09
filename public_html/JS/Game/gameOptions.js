/* global onCanvasClick, onCanvasMove, player, enemy, canvasWidth, canvasHeight, enemeyProjSpeed */
var fps = 48;
var vitesse = 1;
var showPoints = false;
var difficulte = 1;
var vie = 1;
var progressiveDifficulty = true;
var bossSpawnPoint = 1000;
var enemyUpgrade = 250;
var control = 1;

function setOptions(startGameValue) {
    vitesse = startGameValue.vitesse;
    showPoints = startGameValue.points;
    difficulte = startGameValue.difficulte;
    vie = startGameValue.nombreDeVie;
    control = startGameValue.control;

    generateDefaultValue();
    generatePlayerControl();

    processOptions();
}

function processOptions() {
    if (difficulte === 0) {
        enemyAimOffset = 80;
        enemyFireRate = [100000, 100000];
        enemyBaseSpawnIntervale = 24;
        upgradeDropSpeed = 3;
        upgradeBaseSpawnIntervale = 24000;
        player.upgrades[5] = 10;
        baseMissileIntervale = 3;
        baseFireingIntervale = 1;
        enemyBaseSpawnIntervale = 10;
        enemy.hp = 5;
    } else if (difficulte === 1) {
        enemyAimOffset = 80;
        enemyFireRate = [20, 40];
        enemyBaseSpawnIntervale = 24;
        upgradeDropSpeed = 3;
        upgradeBaseSpawnIntervale = 24;
        bombLeft = 5;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    } else if (difficulte === 2) {
        enemyAimOffset = 30;
        enemyFireRate = [20, 40];
        enemyBaseSpawnIntervale = 32;
        upgradeDropSpeed = 4;
        upgradeBaseSpawnIntervale = 32;
        bombLeft = 2;
        enemy.hp = 2;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    } else if (difficulte === 3) {
        enemyAimOffset = 20;
        enemyFireRate = [15, 30];
        enemyBaseSpawnIntervale = 12;
        upgradeDropSpeed = 4;
        upgradeBaseSpawnIntervale = 42;
        enemy.hp = 2;
        bombLeft = 2;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    }
}

function generateDefaultValue() {
    player.x = canvasWidth / 2 + player.larg / 2;
    player.y = canvasHeight - player.haut;
    points = 0;
    enemy.hp = 1;
    enemySpawnIntervale = 0;
    enemeyProjSpeed = 10;
    bombLeft = 0;
    bossIsSpawn = false;
    bossLevel = 1;
}

function upgradeDifficultyProg() {
    /*
     * enemy hp
     * enemy fire intervale
     * enemy spawn rate
     * enemy projectiles speed
     */
    var upgrade = Math.floor(Math.random() * 4);
    var fireRate = enemyFireRate[0];
    switch (upgrade) {
        case 0:
            if (enemy.hp < 5) {
                enemy.hp++;
            }
            break;
        case 1:
            if (fireRate > 5) {
                enemyFireRate[0] -= 5;
                enemyFireRate[1] -= 5;
            } else {
                upgradeDifficultyProg();
            }
            break;
        case 2:
            if (enemyBaseSpawnIntervale > 3) {
                enemyBaseSpawnIntervale -= 2;
            } else {
                upgradeDifficultyProg();
            }
            break;
        case 3:
            enemeyProjSpeed += 2;
            break;
    }
}