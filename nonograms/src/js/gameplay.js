import { openModal } from './modal.js';
import { template } from './template.js';
import { renderHintsLeft, renderHintsTop } from './renderHints.js';

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

const checkGameWin = () => {
  for (let i = 0; i < templateField.length; i++) {
    for (let j = 0; j < templateField[i].length; j++) {
      if (templateField[i][j] === 1 && gameCells[i][j] === 0) {
        return false;
      }
    }
  }

  openModal();
};

export const handleClickButtonRandom = (buttonRandom) => {
  buttonRandom.addEventListener('click', () => {
    removeBoxActive();
    getRandomTemplate();
  });
};

// выбрать случайный шаблон для игры
export const getRandomTemplate = () => {
  let index = Math.floor(Math.random() * template.length);
  const randomTemplate = template[index];

  renderHintsLeft(randomTemplate);
  renderHintsTop(randomTemplate);
  setTemplateField(randomTemplate.field);
  selectTemplateOption(randomTemplate);
};

// Функция для выбора шаблона для игры
export const chooseTemplateForGame = () => {
  const selectTemplate = document.querySelector('.select-template');

  if (selectTemplate) {
    selectTemplate.addEventListener('change', handleTemplateSelection);
  }
};

// Функция для выбора определенного шаблона из списка
const selectTemplateOption = (randomTemplate) => {
  const options = document.querySelectorAll('.template-option');

  options.forEach((option) => {
    if (option.textContent === randomTemplate.name) {
      option.selected = true;
    }
  });
};

const handleTemplateSelection = () => {
  const options = document.querySelectorAll('.template-option');

  options.forEach((option) => {
    if (option.selected) {
      const selectedTemplateName = option.textContent;
      const selectedTemplate = template.find((item) => item.name === selectedTemplateName);

      if (selectedTemplate) {
        removeBoxActive();
        renderHintsLeft(selectedTemplate);
        renderHintsTop(selectedTemplate);
        setTemplateField(selectedTemplate.field);
        selectTemplateOption(selectedTemplate);
      }
    }
  });
};

const removeBoxActive = () => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => box.classList.remove('active'));
};