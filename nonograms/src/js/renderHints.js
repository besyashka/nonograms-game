import { createElement } from './renderPage.js';

// добавить исловые подсказки слева
export const renderHintsLeft = (template) => {
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
export const renderHintsTop = (template) => {
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