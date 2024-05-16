document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.querySelector(".gameContainer");
    const ball = document.querySelector(".ball");
    const paddle = document.querySelector(".paddle");
    // ブロックの行数
    const blockLine = 4;
    // 1行あたりのブロック数
    const numBlocks = 8;
    // 1行ごとのブロックカラー
    const blockColor = ["orange", "silver", "green", "purple"];
    // ブロック(配列)
    let arrBlock = [];

    for (let i = 0; i < blockLine * numBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        gameContainer.appendChild(block);
        const row = Math.floor(i / numBlocks);
        const col = i % numBlocks;
        const colorIndex = row % blockColor.length;
        block.style.top = row * 30 + "px";
        block.style.left = col * 75 + "px";
        block.style.backgroundColor = blockColor[colorIndex];
        arrBlock.push(block);
    }

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 4;
    let ballSpeedY = 4;

    start();

    function start() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        let allBlocksCleared = true;

        // 衝突検出(左右)
        if (ballX < 0 || ballX + 30 > 600) {
            ballSpeedX = -ballSpeedX;
        }
        // 衝突検出(上)
        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
        // 衝突検出(下)
        if (ballY + 20 > 400) {
            gameover();
            return;
        }
        // 衝突検出(パドル)
        if (
            ballX + 20 > paddle.offsetLeft &&
            ballX - 20 < paddle.offsetLeft + paddle.offsetWidth &&
            ballY + 20 > paddle.offsetTop &&
            ballY - 20 < paddle.offsetTop + paddle.offsetHeight
        ) {
            ballSpeedY = -ballSpeedY;
        }
        // 衝突検出(ブロック)
        arrBlock.forEach(block => {
            if (block.style.display !== "none") {
                allBlocksCleared = false;
                if (
                    ballX + 20 > block.offsetLeft &&
                    ballX - 20 < block.offsetLeft + block.offsetWidth &&
                    ballY + 20 > block.offsetTop &&
                    ballY - 20 < block.offsetTop + block.offsetHeight
                ) {
                    ballSpeedY = -ballSpeedY;
                    block.style.display = "none";
                }
            }
        });

        if (allBlocksCleared) {
            gameClear();
            return;
        }

        requestAnimationFrame(start);
    }

    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX - gameContainer.getBoundingClientRect().left;
        const paddleX = mouseX - paddle.offsetWidth / 2;
        if (paddleX < 0) {
            paddle.style.left = "0px";
        } else if(paddleX + paddle.offsetWidth > gameContainer.offsetWidth) {
            paddle.style.left = gameContainer.offsetWidth - paddle.offsetWidth + "px";
        } else {
            paddle.style.left = paddleX + "px";
        }
    })

    function gameover() {
        const isRestart = confirm("ゲームオーバー もう一度プレイしますか？");
        if (isRestart) {
            resetGame();
        }
    }
    function gameClear() {
        alert("ゲームクリア！新たにゲームを開始しますか？");
        resetGame();
    }
    function resetGame() {
        ballX = 500;
        ballY = 200;
        ballSpeedX = 4;
        ballSpeedY = 4;
        paddle.style.left = "250px";
        arrBlock.forEach(function (block) {
            block.style.display = "block";
        })
        start();
    }    
})