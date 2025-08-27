const container = document.querySelector("#container");

let mouseDown = false;
let eraseMode = false;

// Mouse events
document.body.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  mouseDown = false;
});

// Touch events (mobile)
document.body.addEventListener("touchstart", () => {
  mouseDown = true;
});
document.body.addEventListener("touchend", () => {
  mouseDown = false;
});

function createGrid(size) {
  container.innerHTML = "";
  const containerSize = container.clientWidth; // responsive size
  const squareSize = containerSize / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Mouse click
    square.addEventListener("mousedown", () => {
      if (eraseMode) {
        square.classList.remove("colored");
      } else {
        square.classList.add("colored");
      }
    });

    // Mouse drag
    square.addEventListener("mouseover", () => {
      if (mouseDown) {
        if (eraseMode) {
          square.classList.remove("colored");
        } else {
          square.classList.add("colored");
        }
      }
    });

    // Touch tap
    square.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (eraseMode) {
        square.classList.remove("colored");
      } else {
        square.classList.add("colored");
      }
    });

    // Touch drag
    square.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("square")) {
        if (eraseMode) {
          target.classList.remove("colored");
        } else {
          target.classList.add("colored");
        }
      }
    });

    container.appendChild(square);
  }
}

// Buttons
const drawBtn = document.querySelector("#drawBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const borderBtn = document.querySelector("#borderBtn");
const clearBtn = document.querySelector("#clearBtn");

borderBtn.addEventListener("click", () => {
  container.classList.toggle("no-borders");
  borderBtn.classList.toggle("active");
});

drawBtn.addEventListener("click", () => {
  eraseMode = false;
  drawBtn.classList.add("active");
  eraseBtn.classList.remove("active");
});

eraseBtn.addEventListener("click", () => {
  eraseMode = true;
  eraseBtn.classList.add("active");
  drawBtn.classList.remove("active");
});

clearBtn.addEventListener("click", () => {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("colored");
  });
});

// Slider controls
const gridSizeSlider = document.querySelector("#gridSize");
const gridSizeValue = document.querySelector("#gridSizeValue");

gridSizeSlider.addEventListener("input", () => {
  const size = gridSizeSlider.value;
  gridSizeValue.textContent = `${size} x ${size}`;
  createGrid(size);
});

// Default grid
createGrid(16);
