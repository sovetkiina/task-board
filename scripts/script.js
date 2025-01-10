const cardsContainer = document.querySelector(".task-board__cards");
const workCheckbox = document.getElementById("work-box");
const personalCheckbox = document.getElementById("personal-box");
const readCheckbox = document.getElementById("read-box");
const addButton = document.querySelector(".task-board__filter-add-button");
const addCardPopup = document.querySelector(".popup_type_task");
const popupClose = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const inputs = form.querySelectorAll(".popup__input");
const taskTypeInput = document.getElementById("task-type");
const taskTitleInput = document.getElementById("task-title");

const tagMapping = {
  работа: "work",
  личное: "personal",
  почитать: "read",
};

// Ключ для хранения данных в Local Storage
const STORAGE_KEY = "taskBoardData";

// Загружаем данные из Local Storage
const loadCardsFromStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : [];
};

// Сохраняем данные в Local Storage
const saveCardsToStorage = (cards) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

// Инициализируем данные карточек из Local Storage
let cardsData = loadCardsFromStorage();

/*
const cardsData = [
  { text: "Добавить анимацию при наведении на кнопки", tag: "work" },
  { text: "Сделать возможность перетаскивания карточек", tag: "work" },
  { text: "Сходить на лекцию по йоге", tag: "personal" },
  { text: "Позвонить в фитнес-центр", tag: "personal" },
  { text: "«Чапаев и Пустота» / Виктор Пелевин", tag: "read" },
  { text: "Atomic Habits / James Clear", tag: "read" },
  { text: "«Ясно, понятно» / Максим Ильяхов", tag: "read" },
  { text: "Добавить сортировку карточек", tag: "work" },
  { text: "Оплатить коммуналку", tag: "personal" },
  { text: "Искусство тренировок / Геральт из Ривии", tag: "read" },
  { text: "Купить шампунь", tag: "personal" },
  { text: "Отправить код на проверку тимлиду", tag: "work" },
  { text: "Посмотреть, вышел ли новый Javascript-фреймворк", tag: "work" },
  { text: "Сделать брелок от домофона", tag: "personal" },
];
*/

// Функция для создания карточки
const createCard = ({ text, tag }) => {
  // Создаем контейнер для карточки
  const card = document.createElement("div");
  card.classList.add("task-board__card");

  // Создаем текстовый элемент
  const cardText = document.createElement("p");
  cardText.classList.add("task-card__text");
  cardText.textContent = text;

  // Создаем тег
  const cardTag = document.createElement("div");
  cardTag.classList.add("tag", tag); // Пример: "tag work"
  cardTag.textContent =
    tag === "work" ? "Работа" : tag === "personal" ? "Личное" : "Почитать";

  // Собираем карточку
  card.appendChild(cardText);
  card.appendChild(cardTag);

  return card;
};

const filterCards = () => {
  // Очищаем контейнер перед добавлением новых карточек
  cardsContainer.innerHTML = "";
  // Фильтруем карточки по состоянию чекбоксов
  cardsData.forEach((card) => {
    if (
      (workCheckbox.checked && card.tag === "work") ||
      (personalCheckbox.checked && card.tag === "personal") ||
      (readCheckbox.checked && card.tag === "read")
    ) {
      cardsContainer.appendChild(createCard(card));
    }
  });
};

// Обработчики изменений для чекбоксов
workCheckbox.addEventListener("change", filterCards);
personalCheckbox.addEventListener("change", filterCards);
readCheckbox.addEventListener("change", filterCards);

// Инициализируем отображение карточек
filterCards();

// Открытие попапа добавления новой задачи
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("click", handleOverlayClose);
}

// Функция для закрытия попапа
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("click", handleOverlayClose);
}

addButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

popupClose.addEventListener("click", () => {
  closeModal(addCardPopup);
});

// Обработчик закрытия попапа по нажатию клавиши Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// Обработчик закрытия попапа по клику на оверлей
function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

const config = {
  inputErrorClass: "popup__input_type_error", // Класс для ввода с ошибкой
  errorClass: "popup__error_visible", // Класс для сообщения об ошибке
};

// Функция для отображения ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция для скрытия ошибки валидации
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(form, input, config);
  });
});

// Обработчик отправки формы добавления новой задачи
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskType = taskTypeInput.value.trim().toLowerCase();
  const taskTitle = taskTitleInput.value.trim();

  // Проверяем, что все поля заполнены
  if (!taskType || !taskTitle) {
    return;
  }

  const mappedTag = tagMapping[taskType] || taskType;

  // Проверяем валидность типа задачи
  const validTags = ["work", "personal", "read"];
  if (!validTags.includes(mappedTag)) {
    return;
  }

  // Создаем новую карточку
  const newCardData = { text: taskTitle, tag: mappedTag };

  // Добавляем задачу в данные и Local Storage
  cardsData.push(newCardData);

  saveCardsToStorage(cardsData);
  // Отображаем обновленные карточки
  filterCards();

  // Сбрасываем форму
  form.reset();

  // Закрываем попап
  closeModal(addCardPopup);
});
