import { boundaries } from "../collisions/collisions.js";
import { background, foreground } from "../../data/instances.js";
import { battleZones } from "../battle/battleZones.js";

/* // Movables 

	En un array mantendremos todos los objetos que deban moverse para simular el movimiento del jugador, siendo que todos deberan moverse hacia la misma direccion y en el mismo intervalo cada vez que se cumpla la condicion de que el jugador se mueve.

	crearemos 4 funciones auxiliares para evitar repetir codigo en caso de que necesitemos moverlos por algun otro motivo y para favorecer la legibilidad


*/
export const movables = [background, ...boundaries, foreground, ...battleZones];

export function movablesMoveDown(condition) {
	if (condition) movables.forEach((e) => (e.position.y += 3));
}
export function movablesMoveRight(condition) {
	if (condition) movables.forEach((e) => (e.position.x += 3));
}
export function movablesMoveUp(condition) {
	if (condition) movables.forEach((e) => (e.position.y -= 3));
}
export function movablesMoveLeft(condition) {
	if (condition) movables.forEach((e) => (e.position.x -= 3));
}
/* ////////////////////////////////////////////////// */
