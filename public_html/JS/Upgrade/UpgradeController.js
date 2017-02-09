/* global player, playerNormalProjectile, upgradeBaseSpawnIntervale */

/*
 * 1 = larger projectile
 */
var upgrade = {
    x: 0,
    y: 0,
    larg: 30,
    haut: 30,
    color: "rgba(0, 0, 255, 1)",
    upgrade: 0,
    image: "crate"
};

var upgradeValueList = [5, 2, 1, 5, 5, 1];
var upgradeMaxValueList = [0, 5, 7, 6, 5, 3];

var upgradeList = [];
var upgradeDropSpeed = 4;
var upgradeSpawnIntervale = 0;
var upgradeBaseSpawnIntervale = 30;

var upgradePoints = 25;

function setUpgradePosition() {
    spawnUpgrade();
    for (var i = 0; i < upgradeList.length; i++) {
        if (upgradeList[i].y > 500) {
            upgradeList.splice(i, 1);
            i--;
        } else if (isHit(player, upgradeList[i])) {
            addUpgradeToPlayer(upgradeList[i]);
            upgradeList.splice(i, 1);
            i--;
            addPoints(upgradePoints);
        } else {
            upgradeList[i].y += upgradeDropSpeed;
        }
    }

}
function spawnUpgrade() {
    if (upgradeSpawnIntervale <= 0) {
        var min = Math.ceil(0);
        var max = Math.floor(upgradeValueList.length);
        var upgradeValue = Math.floor(Math.random() * ((max + 1) - min) + min);
        upgradeList.push({
            x: (Math.random() * (470 - 0) + 0),
            y: upgrade.y,
            larg: upgrade.larg,
            haut: upgrade.haut,
            color: upgrade.color,
            upgrade: upgradeValue,
            upgradeValue: upgrade.upgradeValue,
            image: "crate"
        });
        upgradeSpawnIntervale = upgradeBaseSpawnIntervale;
    } else {
        upgradeSpawnIntervale--;
    }
}
function addUpgradeToPlayer(upgrade) {
    switch (upgrade.upgrade) {
        case 0:
            if (player.upgrades[0] < upgradeMaxValueList[0]) {
                player.upgrades[0]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 1:
            if (player.upgrades[1] < upgradeMaxValueList[1]) {
                player.upgrades[1]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 2:
            if (player.upgrades[2] < upgradeMaxValueList[2]) {
                player.upgrades[2]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 3:
            if (player.upgrades[3] < upgradeMaxValueList[3]) {
                player.upgrades[3]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 4:
            if (player.upgrades[4] < upgradeMaxValueList[4]) {
                player.upgrades[4]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 5:
            if (player.upgrades[5] < upgradeMaxValueList[5]) {
                player.upgrades[5]++;
            }
            break;
    }
}