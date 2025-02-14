const gameCells = Array.from({ length: 5 }, () => Array(5).fill(0));
let templateField = null;

export const setTemplateField = (field) => {
  templateField = field;
};

// переключение цвета ячейки с классом 'box'
export const toggleBoxActive = (gameField) => {
  gameField.addEventListener('click', (e) => {
    const clickedBox = e.target;
    if (clickedBox.classList.contains('box')) {
      clickedBox.classList.toggle('active');

      updateGameCells(clickedBox, gameField);
    }
  });
};

// функция для обновления gameCells
const updateGameCells = (clickedBox, gameField) => {
  const index = Array.from(gameField.children).indexOf(clickedBox);
  const row = Math.floor(index / 5);
  const col = index % 5;

  gameCells[row][col] = clickedBox.classList.contains('active') ? 1 : 0;

  checkGameWin();
};