import { keys } from "../constants.js";

export let lastKey = "";

export const keyDownEvent = window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			break;

		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			break;

		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			break;

		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			break;
	}
});
export const keyUpEvent = window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "w":
			keys.w.pressed = false;
			break;

		case "a":
			keys.a.pressed = false;
			break;

		case "s":
			keys.s.pressed = false;
			break;

		case "d":
			keys.d.pressed = false;
			break;
	}
});
