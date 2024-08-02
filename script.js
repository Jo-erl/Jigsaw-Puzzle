const startMenu = document.getElementById("start-menu");
const gameInterface = document.getElementById("game-interface");
const puzzleContainer = document.getElementById("puzzle-container");
const startButton = document.getElementById("start-button");
const endScreen = document.getElementById("end-screen");
const playAgainButton = document.getElementById("play-again-button");

const images = [
  "images/image1.webp",
  "images/image2.webp",
  "images/image3.webp",
  "images/image4.webp",
  "images/image5.webp",
  "images/image6.webp",
  "images/image7.webp",
  "images/image8.webp",
  "images/image9.webp",
  "images/image10.webp",
  "images/image11.webp",
  "images/image12.webp",
  "images/image13.webp",
  "images/image14.webp",
  "images/image15.webp",
  "images/image16.webp",
  "images/image17.webp",
  "images/image18.webp",
  "images/image19.webp",
  "images/image20.webp",
  "images/image21.webp",
  "images/image22.webp",
  "images/image23.webp",
  "images/image24.webp",
  "images/image25.webp",
  "images/image26.webp",
  "images/image27.webp",
  "images/image28.webp",
  "images/image29.webp",
  "images/image30.webp",
  "images/image31.webp",
  "images/image32.webp",
  "images/image33.webp",
  "images/image34.webp",
  "images/image35.webp",
  "images/image36.webp",
  "images/image37.webp",
  "images/image38.webp",
  "images/image39.webp",
  "images/image40.webp",
  "images/image41.webp",
];
let currentImageIndex = -1;
const gridSize = 3;
let pieces = [];
let selectedPiece = null;

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

function startGame() {
  startMenu.style.display = "none";
  endScreen.style.display = "none";
  gameInterface.style.display = "block";

  currentImageIndex = getNextImageIndex();
  initializePuzzle();
}

function getNextImageIndex() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  return currentImageIndex;
}

function initializePuzzle() {
  pieces = Array.from({ length: gridSize * gridSize }, (_, index) => index);
  shuffleArray(pieces);
  renderPuzzle();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderPuzzle() {
  puzzleContainer.innerHTML = "";
  pieces.forEach((piece, index) => {
    const pieceElement = document.createElement("div");
    pieceElement.classList.add("puzzle-piece");
    pieceElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
    pieceElement.style.backgroundPosition = `${
      ((piece % gridSize) / (gridSize - 1)) * 100
    }% ${(Math.floor(piece / gridSize) / (gridSize - 1)) * 100}%`;
    pieceElement.addEventListener("click", () => selectPiece(index));
    puzzleContainer.appendChild(pieceElement);
  });
}

function selectPiece(index) {
  if (selectedPiece === null) {
    selectedPiece = index;
    puzzleContainer.children[index].classList.add("selected");
  } else {
    swapPieces(selectedPiece, index);
    puzzleContainer.children[selectedPiece].classList.remove("selected");
    selectedPiece = null;
  }
}

function swapPieces(index1, index2) {
  [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
  renderPuzzle();
  if (isPuzzleSolved()) {
    setTimeout(showEndScreen, 300);
  }
}

function isPuzzleSolved() {
  return pieces.every((piece, index) => piece === index);
}

function showEndScreen() {
  endScreen.style.display = "flex";
}
