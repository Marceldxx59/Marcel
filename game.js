


"use strict"

	const gameBoard = [...document.querySelectorAll(".field")];
	const desc = document.querySelector(".description");
	const span = document.querySelector(".winDisplay");
	const fields = ["", "", "", "", "", "", "", "", ""];
	let counter = 0;
	let gameOver = false;


	function resetGame(btn) {
		counter = 0;
		gameOver = false;
		span.innerText = "";
		btn.remove();
		gameBoard.forEach(item => {
			if (item.firstChild) {
				item.firstChild.remove();
			}
		});
		fields.fill("");
		init();
	};

	function reset() {

		const btn = document.createElement("button");
		btn.innerText = "resetuj";
		desc.appendChild(btn);
		btn.addEventListener("click", () => resetGame(btn));
	};
	function winner(figure) {
		gameOver = true;
		if (figure === "cross") {
			span.innerText = "Niestety, Przegrałeś!"
		} else if (figure === "circle") {
			span.innerText = "Udało się! Wygrałeś!";
		} else if (figure === "draw") {
			span.innerText = "Remis!!";
		}
		;
		reset();
	};


	const checkWin = figure => {

		if (
			(fields[0] === figure && fields[1] === figure && fields[2] === figure) ||
			(fields[0] === figure && fields[4] === figure && fields[8] === figure) ||
			(fields[0] === figure && fields[3] === figure && fields[6] === figure) ||
			(fields[1] === figure && fields[4] === figure && fields[7] === figure) ||
			(fields[2] === figure && fields[5] === figure && fields[8] === figure) ||
			(fields[3] === figure && fields[4] === figure && fields[5] === figure) ||
			(fields[6] === figure && fields[7] === figure && fields[8] === figure) ||
			(fields[6] === figure && fields[4] === figure && fields[2] === figure)
		) {
			winner(figure)
		}
		else if (counter === 9) {
			winner("draw")
		}
	};
	const computerTurn = () => {
		if (counter === 9) return;
		const crossContainer = document.createElement("div");
		const crossElement = document.createElement("div");
		crossElement.classList.add("cross");
		crossContainer.classList.add("crossContainer");
		crossContainer.appendChild(crossElement);

		const crossIndex = Math.floor(Math.random() * fields.length);

		if (fields[crossIndex]) {
			computerTurn();
			return;
		}

		const div = document.querySelector(`.field:nth-child(${crossIndex + 1})`);
		div.appendChild(crossContainer);
		fields[crossIndex] = "cross";

		counter++;
		checkWin("cross");
	};

	const pointCircle = (event, index) => {
		const circleElement = document.createElement("div");
		circleElement.classList.add("circle");
		circleElement.setAttribute("draggable", "false");
		event.target.appendChild(circleElement);
		fields[index] = "circle";
		counter++;
		checkWin("circle");
		if (gameOver) return
		computerTurn();
	};

	const init = () => {

		gameBoard.forEach((field, index) => {
			function listener() {
				field.removeEventListener("click", listener);
				if (field.childElementCount || gameOver) {

					// field.removeEventListener("click", listener);
					console.log('stop');

					return;
				}

				pointCircle(event, index);
			};
			field.addEventListener("click", listener);
		}
		)
	};

	init();
	
