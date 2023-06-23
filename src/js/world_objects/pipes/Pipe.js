/**
 * Pipe - a pipe
 */

import Snappable from "../Snappable";
import Tank from "../tanks/Tank"
import * as d3 from "d3"
import Rect from "../../shapes/Rect";

export default class Pipe extends Snappable {

	/**
	 * constructor()
	 * @description constructs the pipe
	 * @param {Vector} center the center of the pipe
	 * @param {Number} width the width of the pipe
	 * @param {Number} interiorHeight the interior height of the pipe
	 * @param {Number} wallWidth the wall width of the pipe
	 */
	constructor(layer, center, width, interiorHeight, wallWidth) {
		super(layer, center)

		this._wallWidth = wallWidth;
		this._interiorHeight = interiorHeight;
		this._position = center
		//this.center = center; // position of pipe
		this._width = width;
		this._opened = true;

		this._drops = [];

		this._rect = new Rect(this.position, this.width, this.height);
		this._rotation = 0;

		//this.updatePosition();
  	}

	

	/**
	 * @description adds a drop to the pipe
	 * @param {Drop} drop the drop to add
	 */
	addDrop (drop) {
		this._drops.push(drop)
	};

	/**
		takeExitingDrops()
		@description takes the exiting drops from the pipe
	*/
	takeExitingDrops(side) {
		// search for available drops
		var exitingDrops = []; // drops at their exit.
		var keptDrops = []; // drops that are not about to exit
		for(const drop of this._drops) {
			//debugger
			//console.log(drop);
			// if a drop can no longer flow in the direction it was
			// flowing, give it is at its spout, and ready to leak.
			if(!drop.canFlow(this) && side === drop.direction) {
				exitingDrops.push(drop);
				//console.log("Direction: " + drop.direction)
				//console.log("Exiting");
			} else {
				keptDrops.push(drop);
			}
		}
		this._drops = keptDrops;
		return exitingDrops;
	};


	/**
	 * updateDrops()
	 * @description update the drops within the pipe
	 */
	updateDrops() {
		// check if 
		for(const x in this._drops) {
			if(this._drops[x].canFlow(this)) {
				this._drops[x].flow();
			}
		}
	};

	/*
		=============Drawing the Pipe=============
	*/
	create() {
		this._group = this._layer.append("g")
		this._svg = {
			walls: this._group.append("rect"),
			interior: this._group.append("rect")
		}

		this._svg.walls.attr("name", "pipeWalls")
		this._svg.interior.attr("name", "pipeInterior")

		this.updateSVG();
	}



	updateSVG() {
		//this.updatePosition();
	
		if(this.rotation == 0) {
			//let extraWidth = (this.attachments.right && this.attachments.right[0].wallWidth) ? this.attachments.right[0].wallWidth : 0
			//console.log(extraWidth);


			// interior
			this._svg.interior.attr("width", this._width);
			this._svg.interior.attr("height", this._interiorHeight);
			this._svg.interior.attr("x", this._position.x);
			this._svg.interior.attr("y", this._position.y + this._wallWidth);
		} else {
			// interior
			this._svg.interior.attr("width", this._interiorHeight);
			this._svg.interior.attr("height", this._width);
			this._svg.interior.attr("x", this._position.x + this._wallWidth);
			this._svg.interior.attr("y", this._position.y);
		}

		// walls
		this._svg.walls.attr("width", this.width);
		this._svg.walls.attr("height", this.height);
		this._svg.walls.attr("x", this._position.x);
		this._svg.walls.attr("y", this._position.y);
		this._svg.walls.style("fill", "black")
					.style("fill-opacity", 1)


		// interior
		this._svg.interior.style("fill", "white")
						.style("fill-opacity", 1)

	}

	destroySVG() {
		this._group.remove()
	}
	/*
		==========================================
	*/

	/**
	 * rotate() 
	 * @description rotates the pipe
	 */
	rotate() {
		this._rotation = (this._rotation + 90) % 180
	}

	/**
	 * set rotation()
	 * @description sets the rotation of the pipe
	 */
	set rotation(value) {
		this._rotation = value;
	}

	/**
	 * get rotation()
	 * @description gets the rotation of the pipe
	 * @returns rotation of the pipe
	 */
	get rotation() {
		return this._rotation;
	}


	/*
		Switch the pipe too and from horizontal and vertical orientation.
	*/




	/************************************************
		Physical Properties
	************************************************/
	

  

	getDropSize() {
		return this._interiorHeight;
	};

	/**
	 * getSnapAreas()
	 * @description gets the snap areas of the pipe
	 * @returns the snap areas of the pipe
	 */
	getSnapAreas() {
		if(this.rotation === 0) {
			return {
				left: this.getLeftArea(),
				right: this.getRightArea()
			}
		} else if(this.rotation === 90) {
			return {
				up: this.getUpArea(),
				down: this.getDownArea()
			}
		}

	}


	/**
	 * getDropStartPosition()
	 * @description gets the start position of the drop in the pipe
	 * @param {Side} side the side of the tank the pipe is on
	 */
	getDropStartPosition(side, drop) {
		// position drop at front of pipe
		if(side === "left") {
			return {
				x: this.position.x + this.width - drop.size/2,
				y: this.center.y - drop.size/2
			}
		} else if(side === "right") {
			return {
				x: this.position.x,
				y: this.center.y - drop.size/2
			}
		} else if(side === "up") {
			return {
				x: this.position.x + drop.size/2,
				y: this.position.y
			}
		} else if(side === "down") {
			return {
				x: this.position.x + this.width / 2 - drop.size/2,
				y: this.position.y
			}
		} else {
			console.warn("No Side Chosen for Drop Start")
		}
	}

  	/***
   	 * transferLiquid()
   	 * @description transfers liquid to connected tanks
  	 */
  	transferLiquid() {
		for(const side of Object.keys(this.attachments)) {
			for(const tank of this.attachments[side]) { // for each tank attached to this pipe
				if(tank instanceof Tank) {
					let exitingDrops = this.takeExitingDrops(side); // take the exiting drops
					for(const drop of exitingDrops) {
						tank.addDrop(drop);
						drop.destroy()
						tank.updateFluidBodies()
					}
				}
			}
		}
  	}

  	/**
	 * get rect()
	 * @description gets the rect for this pipe
	 */
	get rect() {
		this._rect.position = this.position;
		this._rect.width = this.width
		this._rect.height = this.height
		return this._rect
	}

	/**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Pipe";
	}

	/**
	 * get height()
	 * @returns the height of the pipe
	 */
	get height() {
		if(this.rotation === 0) {
			return this._interiorHeight + this._wallWidth * 2;
		} else {
			return this._width;
		}
	}
  
	/**
	 * get width()
	 * @returns the width of the pipe
	 */
	get width() {
		if(this.rotation === 0) {
			return this._width;
		} else {
			return this._interiorHeight + this._wallWidth * 2;
		}
	}


	/**
   	 * get opened()
   	 * @returns whether or not the pipe is open
   	 */
	get opened() {
		return this._opened;
	}


}