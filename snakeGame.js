//Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");

let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 13 }];
let food = { x: 15, y: 17 };
let score = 0;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

    function gameEngine() {
        musicSound.play();

        //Updating the Snake
        if (isCollide(snakeArr)) {
            gameOverSound.play();
            musicSound.pause();
            inputDir = { x: 0, y: 0 };
            alert("Game Over. Press any key to play again !");
            snakeArr = [{ x: 10, y: 13 }];
            //   musicSound.play();
            score = 0;
        }

        // Collide Conditions

        function isCollide(snake) {
            //Collide with itself
            for (let i = 1; i < snakeArr.length; i++) {
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                    return true;
                }
            }
            // Collide with boundaries
            if (
                snake[0].x >= 20 || snake[0].x < 0 || snake[0].y >= 20 || snake[0].y < 0
            ) {
                return true;
            }
        }

        //Updating the food and score and high score

        if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
            score += 1;
            scoreVal.innerHTML = score;
            if (score > hScoreVal) {
                hScoreVal = score;
                localStorage.setItem("hScore", JSON.stringify(hScoreVal));
                highScore.innerHTML = "High Score : " + hScoreVal;
            }

            foodSound.play();
            snakeArr.unshift({
                x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y,
            });

            food = {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20),
            };
        }

        // Move the sanke
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

        //Display the snake
        board.innerHTML = "";
        snakeArr.forEach((e, index) => {
            let snakeElement = document.createElement("div");
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;

            if (index == 0) {
                snakeElement.classList.add("snakeHead");
            } else {
                snakeElement.classList.add("snakeBody");
            }
            board.appendChild(snakeElement);
        });

        //Display the food
        let foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
    }
}

// Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 0 }; // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

// High Score
let hScore = localStorage.getItem("hScore");
let hScoreVal = 0;
if (hScore == null) {
    localStorage.setItem("hScore", JSON.stringify(hScoreVal));
} else {
    hScoreVal = JSON.parse(hScore);
    highScore.innerHTML = "High Score : " + hScoreVal;
}