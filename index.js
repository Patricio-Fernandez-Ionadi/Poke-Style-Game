import { keys } from "./utils/constants.js";
import { battleZones } from "./utils/battle/battleZones.js";

import {
	boundaries,
	checkBeforeCollideBottom,
	checkBeforeCollideLeft,
	checkBeforeCollideRight,
	checkBeforeCollideUp,
	rectangularCollision,
} from "./utils/collisions/collisions.js";

import {
	background,
	battleBackground,
	draggle,
	emby,
	foreground,
	player,
} from "./data/instances.js";
import { keyDownEvent, keyUpEvent, lastKey } from "./utils/events/keyEvents.js";
import {
	movablesMoveDown,
	movablesMoveLeft,
	movablesMoveRight,
	movablesMoveUp,
} from "./utils/movables/movables.js";
import { attacks } from "./data/attaks.js";

const battle = {
	initiated: false,
};

// ------------- FUNCTIONS -------------
function stopPlayerOverLimits() {
	player.animate = false;
	if (keys.w.pressed && lastKey === "w") {
		player.animate = true;
		player.image = player.sprites.up;

		/* 
		miraremos las colision boxes para saber su ubicacion, ya que al intentar avanzar nuestro jugador debe detenerse y manejamos el estado de si puede o no moverse con un booleano, si el jugador colisiona con un objeto su estado pasará a false y tampoco nos permitira moverlo en otras direcciones.

		teniendo esto en cuenta detendremos voluntariamente al jugador unas unidades antes de que colisione en determinada direccion para poder detener el movimiento en esa direccion y no en otras
		*/
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];

			if (rectangularCollision(player, checkBeforeCollideBottom(boundary)))
				player.animate = false;
		}

		movablesMoveDown(player.animate);
	} else if (keys.a.pressed && lastKey === "a") {
		player.animate = true;
		player.image = player.sprites.left;

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];

			if (rectangularCollision(player, checkBeforeCollideLeft(boundary)))
				player.animate = false;
		}
		movablesMoveRight(player.animate);
	} else if (keys.s.pressed && lastKey === "s") {
		player.animate = true;
		player.image = player.sprites.down;
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];

			if (rectangularCollision(player, checkBeforeCollideUp(boundary)))
				player.animate = false;
		}
		movablesMoveUp(player.animate);
	} else if (keys.d.pressed && lastKey === "d") {
		player.animate = true;
		player.image = player.sprites.right;
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];

			if (rectangularCollision(player, checkBeforeCollideRight(boundary)))
				player.animate = false;
		}
		movablesMoveLeft(player.animate);
	}
}

/* battleZoneActive


 */
function battleZoneActive(animationID) {
	let someKeyPressed =
		keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed;

	if (someKeyPressed) {
		for (let i = 0; i < battleZones.length; i++) {
			const bz = battleZones[i];

			// check for battle zone trigger
			const overlappingArea =
				(Math.min(player.position.x + player.width, bz.position.x + bz.width) -
					Math.max(player.position.x, bz.position.x)) *
				(Math.min(
					player.position.y + player.height,
					bz.position.y + bz.height
				) -
					Math.max(player.position.y, bz.position.y));

			//  activate battle
			if (
				rectangularCollision(player, bz) &&
				overlappingArea > (player.width * player.height) / 2 &&
				Math.random() < 0.01
			) {
				console.log("hay piñas");
				// deactivate current animation loop
				window.cancelAnimationFrame(animationID);

				battle.initiated = true;
				gsap.to("#overlappingDiv", {
					opacity: 1,
					repeat: 3,
					yoyo: true,
					duration: 0.4,
					onComplete() {
						gsap.to("#overlappingDiv", {
							opacity: 1,
							duration: 0.4,
							onComplete() {
								// activate a new animation loop
								animateBattle();
								gsap.to("#overlappingDiv", {
									opacity: 0,
									duration: 0.4,
								});
							},
						});
					},
				});
			}
		}
	}
}

// ------------- EVENTS -------------
keyDownEvent;
keyUpEvent;

// ------------- ANIMATION LOOP -------------

function animate() {
	const animationID = window.requestAnimationFrame(animate);

	// RENDERS
	background.draw();
	boundaries.forEach((boundary) => {
		boundary.draw();
	});
	player.draw();
	foreground.draw();
	battleZones.forEach((bz) => {
		bz.draw();
	});
	// ZONA DE BATALLA
	player.animate = false;

	if (battle.initiated) return;
	battleZoneActive(animationID);
	// DETENER JUAGDOR
	stopPlayerOverLimits();
}

const renderedSprites = [draggle, emby];
function animateBattle() {
	window.requestAnimationFrame(animateBattle);
	battleBackground.draw();

	renderedSprites.forEach((sprite) => {
		sprite.draw();
	});
}

// Loop Calls
// animate();
animateBattle();

// event listenner buttons (battle)
document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", (e) => {
		const selectedAttack = attacks[e.currentTarget.innerHTML];
		emby.attack({
			attack: selectedAttack,
			recipient: draggle,
			renderedSprites,
		});
	});
});
