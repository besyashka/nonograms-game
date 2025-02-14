import { toggleBoxActive, handleClickButtonRandom } from './gameplay.js';
import { closeModal } from './modal.js';

export const createElement = (tag, className, parent = null, textContent = null) => {
  const element = document.createElement(tag);

  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else {
    element.classList.add(className);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (parent) {
    parent.append(element);
  }

  return element;
};

const createMultipleElements = (num, tag, className, parent) => {
  for (let i = 0; i < num; i++) {
    createElement(tag, className, parent);
  }
};

export const createWrapper = () => {
  const body = document.querySelector('.body');
  const wrapper = createElement('div', 'wrapper', body);

  createHeader(wrapper);
  createMain(wrapper);
};

const createHeader = (parent) => {
  const header = createElement('header', 'header', parent);
  createElement('h1', 'header__title', header, 'Nonograms Game');
};

const createMain = (parent) => {
  const main = createElement('main', 'main', parent);

  createRandomGameButton(main);
  createContainerDropdownList(main);
  createGameField(main);
};

const createRandomGameButton = (parent) => {
  const buttonRandom = createElement('button', 'button-random', parent, 'Random Game');
  handleClickButtonRandom(buttonRandom);
};

const createContainerDropdownList = (parent) => {
  const listsContainer = createElement('div', 'container-dropdown-list', parent);

  createDropdownListLevel(listsContainer);
  createDropdownListPicture(listsContainer);
};

const createDropdownListLevel = (parent) => {
  const dropdownList = createElement('div', ['dropdown-list', 'list-levels'], parent);
  const form = createElement('form', 'form', dropdownList);
  const select = createElement('select', 'select', form);

  createElement('option', 'option', select, 'easy 5x5');
};

const createDropdownListPicture = (parent) => {
  const dropdownList = createElement('div', ['dropdown-list', 'list-pictures'], parent);
  const form = createElement('form', 'form', dropdownList);
  const select = createElement('select', 'select', form);

  createMultipleElements(5, 'option', 'option', select);
};

const createGameField = (parent) => {
  const containerGameField = createElement('div', 'container-game-field', parent);
  createElement('div', 'corner', containerGameField);
  const hintsTop = createElement('div', 'hints-top', containerGameField);
  const hintsLeft = createElement('div', 'hints-left', containerGameField);
  const gameField = createElement('div', 'game-field', containerGameField);

  createMultipleElements(5, 'div', ['hint-top', 'hint'], hintsTop);
  createMultipleElements(5, 'div', ['hint-left', 'hint'], hintsLeft);
  createMultipleElements(25, 'div', 'box', gameField);
  toggleBoxActive(gameField);
};

const generateModal = () => {
  const overlay = createElement('div', 'overlay', document.querySelector('.body'));
  const modalWrapper = createElement('div', 'modal__wrapper', document.querySelector('.body'));
  createElement('h3', 'modal__title', modalWrapper, 'You have solved the nonogram!');
  const buttonClose = createElement('button', 'modal__button-close', modalWrapper, 'Close');

  closeModal(overlay, modalWrapper, buttonClose);
};

generateModal();