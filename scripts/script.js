const cardsContainer = document.querySelector(".task-board__cards");
const workCheckbox = document.getElementById("work-box");
const personalCheckbox = document.getElementById("personal-box");
const readCheckbox = document.getElementById("read-box");

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
