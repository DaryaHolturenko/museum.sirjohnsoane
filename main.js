<script src="../main.js"></script>
const ticketForm = document.getElementById("ticketForm");
const successMessage = document.getElementById("successMessage");

if (ticketForm) {
  ticketForm.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.style.display = "block";
    ticketForm.reset();
  });
}

const points = document.querySelectorAll(".room-point");
const modal = document.getElementById("roomModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

points.forEach((point) => {
  point.addEventListener("click", () => {
    modalTitle.textContent = point.dataset.title;
    modalText.textContent = point.dataset.text;
    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});
const museumModel = document.getElementById("museumModel");
const modelTitle = document.getElementById("modelTitle");
const modelText = document.getElementById("modelText");
const prevModel = document.getElementById("prevModel");
const nextModel = document.getElementById("nextModel");

const models = [
  {
    title: "Камін",
    text: "Декоративний камін є частиною музейного інтер’єру та створює атмосферу класичного простору.",
    src: "../model/fireplace_1.glb"
  },
  {
    title: "Статуя",
    text: "Класична скульптура доповнює художньо-історичний характер музейної експозиції.",
    src: "../model/sculpture.glb"
  },
  {
    title: "Архітектурний фрагмент",
    text: "Архітектурні фрагменти демонструють декоративні особливості історичного простору.",
    src: "../model/greek_column.glb"
  },
  {
    title: "Астролябія",
    text: "Експонат демонструє наукову та історичну цінність колекції.",
    src: "../model/astronomical_quintant.glb"
  },
  {
    title: "Сходи",
    text: "Сходи підкреслюють архітектурну глибину простору.",
    src: "../model/staircase.glb"
  }

];

let currentModel = 0;

function updateModel() {
  const current = models[currentModel];

  museumModel.setAttribute("src", current.src);

  document.getElementById("modelTitle3d").textContent = current.title;
  document.getElementById("modelText3d").textContent = current.text;
}

nextModel.addEventListener("click", () => {
  currentModel = (currentModel + 1) % models.length;
  updateModel();
});

prevModel.addEventListener("click", () => {
  currentModel = (currentModel - 1 + models.length) % models.length;
  updateModel();
});
const modelTitle3d = document.getElementById("modelTitle3d");
const modelText3d = document.getElementById("modelText3d");
function updateModel() {
  museumModel.src = models[currentModel].src;
  modelTitle3d.textContent = models[currentModel].title;
  modelText3d.textContent = models[currentModel].text;
}
