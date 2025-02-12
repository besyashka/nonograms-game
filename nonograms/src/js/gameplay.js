// переключение цвета ячейки с классом 'box'
export const toggleBoxActive = (gameField) => {
  gameField.addEventListener('click', (e) => {
    const clickedBox = e.target;
    if (clickedBox.classList.contains('box')) {
      clickedBox.classList.toggle('active');
    }
  });
};