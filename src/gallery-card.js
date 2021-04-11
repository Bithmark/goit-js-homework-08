// ***1. Создание и рендер разметки по массиву данных и предоставленному шаблону.

import galleryitemsHistory from "/src/gallery-items.js";

// console.log(galleryitemsHistory)

const galleryCard = document.querySelector(".js-gallery");
const openModal = document.querySelector(".js-lightbox");
const closeModal = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const changeImgEl = document.querySelector(".lightbox__image");
const closeOverlayModal = document.querySelector(".lightbox__overlay");

const createGalleryCard = (gallery) => {
  const { preview, original, description } = gallery;
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
};

const transactionGalleryItems = galleryitemsHistory.map(createGalleryCard);

galleryCard.insertAdjacentHTML("afterbegin", transactionGalleryItems.join(""));

// console.log(transactionGalleryItems);

// *** Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryCard.addEventListener("click", onOpenModal);

let activeIndex;

function onOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  openModal.classList.add("is-open");
  changeImgEl.setAttribute(
    "src",
    `${event.target.getAttribute("data-source")}`
  );
  changeImgEl.setAttribute("alt", `${event.target.getAttribute("alt")}`);

  transactionGalleryItems.forEach((element, index) => {
    if (element.includes(event.target.src)) {
      // console.log(element);
      // console.log(event.target.src);
      activeIndex = index;
    }
  });
  console.log(activeIndex);
}

closeModal.addEventListener("click", onCloseModalBtn);

function onCloseModalBtn(event) {
  openModal.classList.remove("is-open");
  changeImgEl.setAttribute("src", "");
  changeImgEl.setAttribute("alt", "");
}

closeOverlayModal.addEventListener("click", onCloseOverlayModal);

function onCloseOverlayModal(event) {
  if (event.currentTarget === event.target) {
    return onCloseModalBtn();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModalBtn();
  }
}

window.addEventListener("keyup", (event) => {
  // ***ArrowRight
  if (
    event.key === "ArrowRight" &&
    activeIndex < galleryitemsHistory.length - 1
  ) {
    activeIndex += 1;
    changeImgEl.src = galleryitemsHistory[activeIndex].original;
    return;
  }
  if (
    event.key === "ArrowRight" &&
    activeIndex + 1 === galleryitemsHistory.length
  ) {
    activeIndex = 0;
    changeImgEl.src = galleryitemsHistory[activeIndex].original;
  }

  // ***ArrowLeft
  if (event.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    changeImgEl.src = galleryitemsHistory[activeIndex].original;
    return;
  }
  if (event.key === "ArrowLeft" && activeIndex === 0) {
    activeIndex = galleryitemsHistory.length - 1;
    changeImgEl.src = galleryitemsHistory[activeIndex].original;
  }
});
