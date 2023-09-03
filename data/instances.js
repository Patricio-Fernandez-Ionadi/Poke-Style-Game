import {
	battleBackgroundImage,
	draggleImage,
	embyImage,
	mapForeground,
	mapImage,
	playerDownImage,
	playerLeftImage,
	playerRightImage,
	playerUpImage,
} from "../img/images.js";
import { Sprite } from "../clases/clases.js";
import { canvas } from "./canvas.js";
import { playerSprite, world } from "../utils/constants.js";

export const background = new Sprite({
	position: {
		x: world.offset.x,
		y: world.offset.y,
	},
	image: mapImage,
});
export const player = new Sprite({
	position: {
		x: canvas.width / 2 - playerSprite.fullImage.x / playerSprite.frames / 2,
		y: canvas.height / 2 - 68 / 2,
	},
	image: playerDownImage,
	frames: { max: playerSprite.frames, hold: 10 },
	sprites: {
		up: playerUpImage,
		down: playerDownImage,
		right: playerRightImage,
		left: playerLeftImage,
	},
});

export const foreground = new Sprite({
	position: {
		x: world.offset.x,
		y: world.offset.y,
	},
	image: mapForeground,
});

// Battle

export const battleBackground = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: battleBackgroundImage,
});

export const draggle = new Sprite({
	position: {
		x: 800,
		y: 95,
	},
	image: draggleImage,
	frames: {
		max: 4,
		hold: 30,
	},
	animate: true,
	isEnemy: true,
});

export const emby = new Sprite({
	position: {
		x: 280,
		y: 325,
	},
	image: embyImage,
	frames: {
		max: 4,
		hold: 20,
	},
	animate: true,
});
