import { Boundary } from "../../clases/clases.js";
import { world } from "../constants.js";
import { collisions } from "./collisionsBoundaries.js";

/*  // collisionsMap

	se crea un array bidimensional con la cantidad de tiles que tiene nuestro escenario (70w x 40h); en un bucle for cada 70 espacios colocaremos desde la posicion de i (inicial 0) hasta el 70 + i (en la primera iteracion será 0, en la segunda 140, en la tercera 210, etc.)

		// Boundary = tile de colision

	creamos un array donde recorreremos en un bucle forEach el array creado recien con 40 arrays de 70 posiciones; donde, cada una de esas posiciones será una linea de las 40 que tiene el mapa de altura (dijimos 70w x 40h, las 40 lineas fueron creadas en collisionsMap)

	en cada una de esas lineas (rows) buscaremos los numeros que nos interesan, en este caso el codigo 1025 que es el que podemos encontrar en el archivo PokeTown.json en el objeto de colisiones; ese archivo solo contiene este tipo de dato y donde no deba estar hallaremos un 0, por lo que podemos usar esto para que en cada celda que hallemos un codigo 1025, crearemos una instancia de la clase Boundary y lo meteremos en el array creado para esto.

	modelo de cada elemento en el array (class Boundary)
	
	boundary : {
		position : {
			x: column,
			y: row
		},
		key: value,
		key: value,
		...,
	}

	al estar en el momento de creacion de la instancia sabremos con exactitud en que linea (row, por medio de la variable i del primer bucle forEach), se encuentra y tambien en que posicion de esa linea (del 0 al 69); informacion suficiente para determinar su posicion en el mapa.

	siendo X su posicion horizontal determinada por la variable j
	e Y su posicion vertical determinada por la variable i

	situemonos en cualquier celda, digamos 40w/30h:
		en la vuelta de la ronda 29 del primer bucle, multiplicando por el alto de cada instancia de Boundary tendremos que la posicion Y sera de 29 * 12 = 348. pero debemos considerar que la posicion de nuestro mapa no esta en x0 y0 por lo que deberemos sumar el world.offset que tenga (-650) quedandonos 348 + -650 = -302.

		sabemos que Y es igual a -302.

		ahora busquemos su posicion en X que sera calculada por el bucle interior.
		En la vuelta 39 del bucle y haciendo el mismo calculo que antes (multiplicando por el ancho de cada Boundary) tendremos 39 * 12 = 468 - 735 (world.offset) = -267.

		tendremos entonces que un boundary ubicado en la posicion 40w/30h debera ubicarse en:
		x: -267
		y: -302

		luego entonces nuestro modelo quedaria:
			boundary : {
		position : {
			x: -267,
			y: -302
		},
		key: value,
		key: value,
		...,
	}
*/
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += world.size.x) {
	collisionsMap.push(collisions.slice(i, world.size.x + i));
}

export const boundaries = [];
collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 1025)
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width + world.offset.x,
						y: i * Boundary.height + world.offset.y,
					},
				})
			);
	});
});
/* ////////////////////////////////////////////////// */

export function rectangularCollision(r1, r2) {
	return (
		r1.position.x + r1.width >= r2.position.x &&
		r1.position.x <= r2.position.x + r2.width &&
		r1.position.y <= r2.position.y + r2.height &&
		r1.position.y + r1.height >= r2.position.y
	);
}

export function checkBeforeCollideBottom(object) {
	return {
		...object,
		position: {
			x: object.position.x,
			y: object.position.y + 3,
		},
	};
}
export function checkBeforeCollideLeft(object) {
	return {
		...object,
		position: {
			x: object.position.x + 3,
			y: object.position.y,
		},
	};
}
export function checkBeforeCollideUp(object) {
	return {
		...object,
		position: {
			x: object.position.x,
			y: object.position.y - 3,
		},
	};
}
export function checkBeforeCollideRight(object) {
	return {
		...object,
		position: {
			x: object.position.x - 3,
			y: object.position.y,
		},
	};
}
