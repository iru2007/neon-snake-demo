const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const size = 20;
let snake = [{ x: 200, y: 200 }];
let food = spawnFood();
let dx = size;
let dy = 0;
let score = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 20) * size,
    y: Math.floor(Math.random() * 20) * size
  };
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -size; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = size; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -size; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = size; dy = 0; }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game Over
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert("Game Over! Score: " + score);
    location.reload();
  }

  snake.unshift(head);

  // Cibo
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = spawnFood();
  } else {
    snake.pop();
  }

  // Snake
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00fff0";
  ctx.fillStyle = "#00fff0";
  snake.forEach(p => ctx.fillRect(p.x, p.y, size, size));

  // Food
  ctx.shadowColor = "#ff0077";
  ctx.fillStyle = "#ff0077";
  ctx.fillRect(food.x, food.y, size, size);
}

setInterval(gameLoop, 120);
