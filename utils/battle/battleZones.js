import { Boundary } from "../../clases/clases.js";
import { world } from "../constants.js";
import { battleZonesBoundaries } from "./battleZonesBoundaries.js";

const battleZonesMap = [];
for (let i = 0; i < battleZonesBoundaries.length; i += world.size.x) {
	battleZonesMap.push(battleZonesBoundaries.slice(i, world.size.x + i));
}

export const battleZones = [];

battleZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 1025) {
			battleZones.push(
				new Boundary({
					position: {
						x: j * Boundary.width + world.offset.x,
						y: i * Boundary.height + world.offset.y,
					},
				})
			);
		}
	});
});
