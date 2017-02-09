/* global ctx */

/* global canvas, canvasWidth, canvasHeight, points */

var menuElement = [];
var optionValue = {
    difficulte: 1,
    nombreDeVie: 1,
    vitesse: 1,
    points: true,
    control:0
};

function setStartMenu() {
    clearCanvas();
    menuElement = [];
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.addEventListener("mousemove", onCanvasMove, false);

    menuElement.push({
        x: 0,
        y: 30,
        larg: canvasWidth,
        haut: 0,
        font: "15px Arial",
        fillText: "Difficulty: " + getTextDifficulty() +
                "  Life : " + optionValue.nombreDeVie +
                "  Speed : " + optionValue.vitesse +
                "  Control : " + (optionValue.control === 0 ? "Keyboard" : "Mouse") +
                "  Show Points : " + optionValue.points,
        utilisation: "display"
    });
    menuElement.push({
        x: 0,
        y: canvasHeight - 50,
        larg: canvasWidth,
        haut: 50,
        font: "60px Arial",
        fillText: "Start Game",
        utilisation: "startGame"
    });
    menuElement.push({
        x: 0,
        y: 50,
        larg: canvas.width,
        haut: 70,
        font: "60px Arial",
        fillText: "Option",
        utilisation: "option"
    });
    if (points > 0 && optionValue.points) {
        menuElement.push({
            x: 0,
            y: canvasHeight - 150,
            larg: canvas.width,
            haut: 50,
            font: "30px Arial",
            fillText: "Points : " + points,
            utilisation: "display"
        });
    }
    drawMenu(menuElement);
}

function setOptionMenu() {
    menuElement = [];
    clearCanvas();
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.addEventListener("mousemove", onCanvasMove, false);
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvasWidth,
        haut: 0,
        font: "15px Arial",
        fillText: "Difficulty: " + getTextDifficulty() +
                "  Life : " + optionValue.nombreDeVie +
                "  Speed : " + optionValue.vitesse +
                "  Control : " + (optionValue.control === 0 ? "Keyboard" : "Mouse") +
                "  Show Points : " + optionValue.points,
        utilisation: "display"
    });
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Speed +",
        utilisation: "speed +"
    });
    menuElement.push({
        x: canvas.width / 2,
        y: 30,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Speed -",
        utilisation: "speed -"
    });
    menuElement.push({
        x: (canvas.width / 3) * 0,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Easy",
        utilisation: "facile"
    });
    menuElement.push({
        x: (canvas.width / 3) * 1,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Normal",
        utilisation: "moyen"
    });
    menuElement.push({
        x: (canvas.width / 3) * 2,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Hard",
        utilisation: "difficile"
    });
    menuElement.push({
        x: 0,
        y: 130,
        larg: canvas.width,
        haut: 50,
        font: "30px Arial",
        fillText: "Show Points",
        utilisation: "points"
    });
    menuElement.push({
        x: 0,
        y: 180,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Add Life",
        utilisation: "vie+"
    });
    menuElement.push({
        x: canvas.width / 2,
        y: 180,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Remove Life",
        utilisation: "vie-"
    });
    menuElement.push({
        x: 0,
        y: 230,
        larg: canvas.width,
        haut: 50,
        font: "30px Arial",
        fillText: "Switch Control",
        utilisation: "control"
    });
    menuElement.push({
        x: 0,
        y: canvasHeight - 160,
        larg: canvasWidth,
        haut: 80,
        font: "60px Arial",
        fillText: "Test* dev only",
        utilisation: "test"
    });
    menuElement.push({
        x: 0,
        y: canvasHeight - 80,
        larg: canvasWidth,
        haut: 80,
        font: "60px Arial",
        fillText: "Main Menu",
        utilisation: "mainMenu"
    });
    drawMenu(menuElement);
}

function onCanvasMove(e) {
    this.style.cursor = 'initial';
    for (var i = 0; i < menuElement.length; i++) {
        if (isCursorOnElement(menuElement[i], e)) {
            if(menuElement[i].utilisation !== "display"){
                this.style.cursor = 'pointer';
            }
            return;
        }
    }
}

function onCanvasClick(e) {
    for (var i = 0; i < menuElement.length; i++) {
        if (isCursorOnElement(menuElement[i], e)) {
            switch (menuElement[i].utilisation) {
                case "startGame":
                    this.style.cursor = 'initial';
                    removeButtonFromMenu();
                    startGame(optionValue);
                    break;
                case "option":
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "speed +":
                    optionValue.vitesse = Math.floor(optionValue.vitesse * 10 + 1) / 10;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "speed -":
                    if (optionValue.vitesse <= 0.1) {
                        break
                    } else {
                        optionValue.vitesse = Math.floor(optionValue.vitesse * 10 - 1) / 10;
                    }
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "facile":
                    optionValue.difficulte = 1;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "moyen":
                    optionValue.difficulte = 2;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "difficile":
                    optionValue.difficulte = 3;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "test":
                    optionValue.difficulte = 0;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "mainMenu":
                    removeButtonFromMenu();
                    setStartMenu();
                    break;
                case "points":
                    optionValue.points = true;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "control":
                    if(optionValue.control === 0){
                        optionValue.control = 1;
                    }else{
                        optionValue.control = 0;
                    }
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vie+":
                    optionValue.nombreDeVie++;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vie-":
                    if (optionValue.nombreDeVie <= 1) {
                        break;
                    }
                    optionValue.nombreDeVie--;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
            }
        }
    }
}

function isCursorOnElement(element, e) {
    var position = getCursorPosition(e);
    var x = position[0];
    var y = position[1];
    return (element !== undefined &&
            x > element.x &&
            x < (element.x + element.larg) &&
            y > element.y &&
            y < (element.y + element.haut));
}

function removeButtonFromMenu() {
    canvas.removeEventListener("click", onCanvasClick, false);
    canvas.removeEventListener("mousemove", onCanvasMove, false);
}

function getTextDifficulty() {
    switch (optionValue.difficulte) {
        case 0:
            return "Dev";
            break;
        case 1:
            return "Easy";
            break;
        case 2:
            return "Normal";
            break;
        case 3:
            return "Hard";
            break;
    }
}