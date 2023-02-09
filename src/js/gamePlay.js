export default class gamePlay {
  constructor() {
    this.gameBoard = 4;

    this.init();
  }

  init() {
    this.drawBoard();
    this.difficultEventListner();
    this.addCellEventListner();
  }

  drawBoard() {
    document.querySelector("body").insertAdjacentHTML(
      "afterbegin",
      `
            <div class="gameBoard"></div>
        `
    );

    const drawCells = () => {
      for (let i = 0; i < this.gameBoard * this.gameBoard; i++) {
        document.querySelector(".gameBoard").insertAdjacentHTML(
          "afterbegin",
          `
                    <div class="cell"></div>
                `
        );
      }
    };

    drawCells();
    this.drawDiffBoard();
    this.drawHealthBoard(5);
    this.drawScoreBoard(0);
  }

  drawDiffBoard() {
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
            <div class="diffBoard">
                <p class="easy">Легко</p>
                <p class="medium">Средне</p>
                <p class="hard">Сложно</p>
            </div>
        `
    );
  }

  drawHealthBoard(health) {
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
            <div class="health-score">
                <p>Осталось попыток: <span class="health">${health}</span> </p>
            </div>
        `
    );
  }

  drawScoreBoard(score) {
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
            <div class="player-score">
                <p>Осталось попыток: <span class="score">${score}</span> </p>
            </div>
        `
    );
  }

  difficultEventListner() {
    let result;

    const diffs = Array.from(document.querySelectorAll(".diffBoard p"));
    const diffBoard = document.querySelector(".diffBoard");

    diffs.forEach((item) => {
      item.addEventListener("click", (e) => {
        switch (e.target.classList.value) {
          case "easy":
            result = { name: "easy", time: 1000 };
            diffBoard.style.display = "none";
            break;
          case "medium":
            result = { name: "medium", time: 750 };
            diffBoard.style.display = "none";
            break;
          case "hard":
            result = { name: "hard", time: 500 };
            diffBoard.style.display = "none";
            break;
        }
        this.getRandomCellWithGoblin(result);
      });
    });
  }

  getRandomCellWithGoblin(obj) {
    function getRandomNumber(min, max) {
      let rand = min + Math.random() * (max - min);
      return Math.floor(rand);
    }

    const cells = Array.from(document.querySelectorAll(".cell"));

    return setInterval(() => {
      cells.forEach((item) => item.classList.remove("cellWithGoblin"));

      cells[getRandomNumber(0, cells.length)].classList.add("cellWithGoblin");
    }, obj.time);
  }

  addCellEventListner() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    let score = 0;

    cells.forEach((item) => {
      item.addEventListener("click", () => {
        if (!item.classList.contains("cellWithGoblin")) {
          document.querySelector(".health").textContent -= 1;
        } else {
          score += 2;
        }

        if (document.querySelector(".health").textContent === "0") {
          alert(`Вы проиграли! Ваш счет: ${score}`);
          location.reload();
        }
      });
    });
  }
}
