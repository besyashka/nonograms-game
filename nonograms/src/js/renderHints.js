import { template } from './template.js';
import { createElement } from './renderPage.js';
import { setTemplateField } from './gameplay.js';

// выбрать случайный шаблон для игры
export const getRandomTemplate = () => {
  let index = Math.floor(Math.random() * template.length);
  const randomTemplate = template[index];
  console.log(randomTemplate.name);

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

// добавить исловые подсказки слева
const renderHintsLeft = (template) => {
  const hintsLeft = document.querySelectorAll('.hint-left');
  const templateField = template.field;

  hintsLeft.forEach((hint) => {
    hint.innerHTML = '';
  });

  for (let row = 0; row < templateField.length; row++) {
    let counter = 0;

    for (let col = 0; col < templateField[row].length; col++) {
      if (templateField[row][col]) {
        counter++;
      } else if (counter > 0) {
        createElement('div', 'number-hint-left', hintsLeft[row], counter);
        counter = 0;
      }
    }

    if (counter > 0) {
      createElement('div', 'number-hint-left', hintsLeft[row], counter);
      counter = 0;
    }
  }
};

// добавить числовые подсказки вверху
const renderHintsTop = (template) => {
  const hintsTop = document.querySelectorAll('.hint-top');
  const templateField = template.field;

  hintsTop.forEach((hint) => {
    hint.innerHTML = '';
  });

  for (let row = 0; row < templateField.length; row++) {
    let counter = 0;

    for (let col = 0; col < templateField[row].length; col++) {
      if (templateField[col][row]) {
        counter++;
      } else if (counter > 0) {
        createElement('div', 'number-hint-top', hintsTop[row], counter);
        counter = 0;
      }
    }

    if (counter > 0) {
      createElement('div', 'number-hint-top', hintsTop[row], counter);
      counter = 0;
    }
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
        renderHintsLeft(selectedTemplate);
        renderHintsTop(selectedTemplate);
        setTemplateField(selectedTemplate.field);
        selectTemplateOption(selectedTemplate);
      }
    }
  });
};