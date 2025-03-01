// Some initialization set ups
document.getElementById('game').style.display = 'none';

function start() {
  document.getElementById('card').style.display = 'none';
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "black";
  document.getElementById('game').style.display = 'block';
  game();
}

function game(){
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  // block is the size of pixels for one cell
  var block = 20;
  var c = 0;

  var snake = {
    // snake position
    x: 160,
    y: 160,
    // snake movement
    dx: block,
    dy: 0,
    // block spaces of snake
    cells: [],
    // length of snake
    length: 4
  };

  var apple = {
    x: 320,
    y: 320
  };

  // Random int between min and max
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Game loop function
  function loop() {
    requestAnimationFrame(loop);

    if(c++ < 6) {
      return;
    }

    c = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);


    // Update snake position according to velocity
    snake.x += snake.dx;
    snake.y += snake.dy;


    // wrap snake around horizontally
    if (snake.x < 0) {
      snake.x = canvas.width - block;
    }
    else if(snake.x >= canvas.width) {
      snake.x = 0;
    }

    // wrap snake around vertically
    if(snake.y < 0) {
      snake.y = canvas.height - block;
    }
    else if(snake.y >= canvas.height) {
      snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if(snake.cells.length > snake.length) {
      snake.cells.pop();
    }

    // draw the apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, block-1, block-1);

    // draw the snake
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {

      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      context.fillRect(cell.x, cell.y, block-1, block-1);

      if(cell.x === apple.x && cell.y === apple.y) {
        snake.length++;

        apple.x = getRandInt(0, 72) * block;
        apple.y = getRandInt(0, 41) * block;
      }

      // check collisions of all cells after this given one, (modified bubble sort??)
      for(var i = index + 1; i < snake.cells.length; i++) {

        //check overlapping parts of snake
        if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160;
          snake.y = 160;

          snake.cells = [];
          snake.length = 4;

          snake.dx = block;
          snake.dy = 0;

          apple.x = getRandInt(0, 72) * block;
          apple.y = getRandInt(0, 41) * block;
        }
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    // left arrow key
   if (e.which === 37 && snake.dx === 0) {
     snake.dx = -block;
     snake.dy = 0;
   }
   // up arrow key
   else if (e.which === 38 && snake.dy === 0) {
     snake.dy = -block;
     snake.dx = 0;
   }
   // right arrow key
   else if (e.which === 39 && snake.dx === 0) {
     snake.dx = block;
     snake.dy = 0;
   }
   // down arrow key
   else if (e.which === 40 && snake.dy === 0) {
     snake.dy = block;
     snake.dx = 0;
   }
  });

  requestAnimationFrame(loop);
}
