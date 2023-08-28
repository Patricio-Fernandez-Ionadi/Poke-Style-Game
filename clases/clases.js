import { c } from "../data/canvas.js";
import { world } from "../utils/constants.js";

export class Sprite {
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1, hold: 10 },
		sprites,
		animate = false,
	}) {
		this.position = position;
		this.image = image;
		this.frames = {
			...frames,
			value: 0,
			elapsed: 0,
		};
		this.animate = animate;
		this.sprites = sprites;

		this.image.onload = () => {
			this.width = this.image.width / this.frames.max;
			this.height = this.image.height;
		};
	}
	/* this.image...
	
		con el metodo onload, cuando tengamos cargada la imagen de nuestra instancia de Sprite definiremos el ancho y alto de la misma.
		casos como el background usaran el valor por defecto de frames qur es de 1 por lo que no se verá afectado por la ecuacion en cuestion para calcular estos valores
		sin embargo el sprite de nuestro personaje tiene 4 frames de animacion por lo que dividiremos el ancho total de la imagen en 4 fracciones de forma que podremos tener solo el ancho de cada sprite y no la secuencia completa.

		la altura en nuestro caso es mucho mas simple ya que estamos usando secuencias horizontales de sprites.
	 */

	draw() {
		c.drawImage(
			this.image,
			this.frames.value * this.width,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y,
			this.image.width / this.frames.max,
			this.image.height
		);

		if (!this.animate) return;

		// solo cuando tengamos mas de 1 frame
		if (this.frames.max > 1) {
			this.frames.elapsed++;
		}

		// solo cada 10 renders
		if (this.frames.elapsed % this.frames.hold === 0) {
			// mientras que tengamos un valor menor al tamaño de cuadros
			if (this.frames.value < this.frames.max - 1) {
				this.frames.value++;
			} else {
				this.frames.value = 0;
			}
		}
	}
}
/* parametros frames
	Este parametro es usado para saber en cuantos cuadros debe ser renderizada una imagen, en caso del background (y de la mayoria de imagenes) solo será una vez.

	casos como puede ser el sprite de animacion de alguna entidad (y para simular movimiento) tendremos varios cuadros (frames) en una misma imagen por lo que tendremos que saber en cuantos cuadros se va a estar animando. Para esto usaremos el valor "max" dentro del objeto de frames

	frames : {
		max: <--,
		..: ..,
		..: ..,
	}

	En el metodo draw() tambien podremos encontrar otros valores como value, y elapsed que seran usados para determinar la frecuencia/rapidez con la que deberan mostrarse esta secuencia de imagenes (o cortes de imagen).
	Si nuestro sprite tiene un valor mayor a 1 (valor por defecto), en la propiedad max, procuraremos que cada render aumente el valor de elapsed para poder llevar el control de la cantidad de veces que se esta dibujando este sprite.
	Usando el operador de modulo podremos lograr que cada X veces que se renderiza esta imagen (o que debiera renderizarse) en este caso:

	cada vez que elapsed % 10 sea equivalente a 0 (es decir cada 10 veces que se ejecuta el metodo draw())
	
	si value es menor que la cantidad de frames -1, aumentaremos nuestro value en 1, en cambio setearemos value a 0

	Para que usamos estos valores y de esta manera tan poco intuitiva?
	los usaremos para hacer el crop de nuestra imagen (recordemos que esto solo se usara en imagenes con varios frames ya que de otra forma los valores se mantendran estaticos en 0 o 1 como son sus valores por defecto)

	en el crop de la imagen tendremoslos siguientes valores

	SECUENCIA 1
	imagen,
	this.frames.value * this.width (0 * 48) = x0
	0,
	this.image.width / this.frames.max (196/4) = width 48 
	image.height

	SECUENCIA 2
	imagen,
	this.frames.value * this.width (1 * 48) = x48
	0,
	this.image.width / this.frames.max (196/4) = width 48 
	image.height

	SECUENCIA 3
	imagen,
	this.frames.value * this.width (2 * 48) = x96
	0,
	this.image.width / this.frames.max (196/4) = width 48 
	image.height

	SECUENCIA 4
	imagen,
	this.frames.value * this.width (3 * 48) = x144
	0,
	this.image.width / this.frames.max (196/4) = width 48 
	image.height

	como this.value en este punto es 3 por lo que no es menor que this.frames.max - 1  como dijimos en la condicion anterior. value vuelve a setearse en 0 y la iteracion vuelve a empezar. Si no restaramos 1 al valor maximo de frames la siguiente secuencia seria 4*48 = 196 y al ser este el tamaño final de nuestra imagen, no tendrimos frame para renderizar lo que generaria parpadeos, o en otras palabras una mala logica del codigo, un error.
*/

export class Boundary {
	static width = world.tileSize.x;
	static height = world.tileSize.y;
	constructor({ position }) {
		this.position = position;
		this.width = world.tileSize.x;
		this.height = world.tileSize.y;
	}

	draw() {
		c.fillStyle = "rgba(255, 0, 0, 0.0)";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

/* // drawImage()
	Este metodo del contexto de canvas puede recibir hasta 9 parametros (5 minimos) donde:

		-	1 (obligatorio) es la imagen en cuestion

		// OPCIONALES
		- 2 (opcional) punto de la imagen desde donde debe ser renderizada (x del crop)
		-	3	(opcional) punto de origen del recorte (y del crop)
		-	4	(opcional) ancho que tendra el render (width del crop)
		-	5	(opcional) alto del recorte (height del crop)
		
		//	
		-	6	(obligatorio) donde se ubicará en nuestro canvas (x)
		-	7	(obligatorio) donde se ubicará en nuestro canvas (y)
		-	8	(obligatorio) ancho con el que debe renderizarse (width)
		-	9	(obligatorio) alto con el que debe renderizarse	 (height)

		en caso de no necesitar recortar la imagen los primeros 5 parametros seran considerados como los basicos y obligatorios, estos parametros pueden adicionarse o no, en caso de ser adicionados serán como esta mencionado en la lista del 2 al 5
*/
