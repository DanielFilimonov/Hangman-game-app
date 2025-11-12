document.addEventListener("DOMContentLoaded", () => {
	const keyBoard = document.querySelector(".keyboard");
	const hintText = document.querySelector(".hint-text b");
	const wordDisplay = document.querySelector(".word-display");
	const hangmanImg = document.querySelector(".hangman-box img");
	const guessesText = document.querySelector(".guesses-text b");
	const gameModal = document.querySelector(".game-modal");
	const playAgainBtn = document.querySelector(".play-again");

	let currentWord, correctLetter, mistakes;
	const maxMistakes = 6;

	const resetGame = () => {
		correctLetter = [];
		mistakes = 0;
		hangmanImg.src = `images/hangman-${mistakes}.svg`;
		guessesText.innerText = `${mistakes} / ${maxMistakes}`;
		keyBoard
			.querySelectorAll("button")
			.forEach((btn) => (btn.disabled = false));
		wordDisplay.innerHTML = currentWord
			.split("")
			.map(() => `<li class="letter"></li>`)
			.join("");
		gameModal.classList.remove("show");
	};

	const gameOver = (isVictory) => {
		setTimeout(() => {
			const modaText = isVictory
				? `Вы отгадали слово:`
				: `Загаданное слово:`;

			gameModal.querySelector("img").src = `images/${
				isVictory ? "victory" : "lost"
			}.gif`;

			gameModal.querySelector("h4").innerText = `${
				isVictory ? "Победа" : "Вы проиграли!"
			}`;

			gameModal.querySelector(
				"p"
			).innerHTML = `${modaText} <b>${currentWord}</b>`;
			gameModal.classList.add("show");
		}, 100);
	};

	const initGame = (button, clickedLetter) => {
		if (currentWord.includes(clickedLetter)) {
			[...currentWord].forEach((letter, index) => {
				if (letter === clickedLetter) {
					correctLetter.push(letter);
					wordDisplay.querySelectorAll("li")[index].innerText =
						letter;
					wordDisplay
						.querySelectorAll("li")
						[index].classList.add("guessed");
				}
			});
		} else {
			mistakes++;
			hangmanImg.src = `images/hangman-${mistakes}.svg`;
		}
		button.disabled = true;
		guessesText.innerText = `${mistakes} / ${maxMistakes}`;

		if (mistakes === maxMistakes) return gameOver(false);

		if (correctLetter.length === currentWord.length) return gameOver(true);
	};

	const getRandomWord = () => {
		const { answer, question } =
		wordList[Math.floor(Math.random() * wordList.length)];
		console.log(answer);
		currentWord = answer;
		hintText.innerText = question;
		resetGame();
	};

	for (let i = 1072; i <= 1077; i++) {
		const button = document.createElement("button");
		button.innerText = String.fromCharCode(i);
		keyBoard.appendChild(button);
		button.addEventListener("click", (e) =>
			initGame(e.target, String.fromCharCode(i))
		);
	}

	const yoButton = document.createElement("button");
	yoButton.innerText = "ё";
	keyBoard.appendChild(yoButton);
	yoButton.addEventListener("click", (e) =>
		initGame(e.target, String.fromCharCode(i))
	);

	for (let i = 1078; i <= 1103; i++) {
		const button = document.createElement("button");
		button.innerText = String.fromCharCode(i);
		keyBoard.appendChild(button);
		button.addEventListener("click", (e) =>
			initGame(e.target, String.fromCharCode(i))
		);
	}
	getRandomWord();
	playAgainBtn.addEventListener("click", getRandomWord);
});
