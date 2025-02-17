export const openModal = () => {
  const overlay = document.querySelector('.overlay');
  const modalWrapper = document.querySelector('.modal__wrapper');
  overlay.classList.add('active');
  modalWrapper.classList.add('active');
};

export const closeModal = (overlay, modalWrapper, buttonClose) => {
  buttonClose.addEventListener('click', () => {
    overlay.classList.remove('active');
    modalWrapper.classList.remove('active');
  });
};