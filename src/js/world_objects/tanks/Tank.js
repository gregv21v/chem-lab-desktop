/*
  Tank - a sided tank is a tank with the ability
  of choosing which side or sides are open.

  Attaching pipes to tank:
		Each tank has a surface are that limits the number of pipes that can be
		connected to the tank. No two pipes can overlap.

		When a pipe is moved over a tank, its snapped to the nearest edge and follows
		along the edge of the tank until the mouse is moved a significant distance
		away from the tank.


		When an object is on the mouse it has particular interactions with the rest of the world
		objects.
*/

import Pipe from "../pipes/Pipe";
import Drop from "../fluids/Drop";
import Fluid from "../fluids/Fluid";
import EmptyFluid from "../fluids/EmptyFluid";
import ContainerFluidBody from "../fluids/ContainerFluidBody";
import SnapPoint from "../SnapPoint";
import Snappable from "../Snappable";
import Rect from "../../shapes/Rect";
import * as d3 from "d3"
import { getNextSide, getRandomInt } from "../../util";
import Group from "../../shapes/Group";
import World from "../../World";
import HeatSource from "../heatSources/HeatSource";

export default class Tank extends Snappable {

	/**
	 * constructor()
	 * @description constructs the sided tank
	 * @param {Point} center the center of the tank
	 * @param {Object (width, height)} interior the interior width and height of the tank
	 * @param {Number} wallWidth the width of the walls of the tank
	 * @param {Boolean} leftOpen indicates whether the left side is opened
	 * @param {Boolean} rightOpen indicates whether the right side is opened
	 * @param {Boolean} upOpen indicates whether the up side is opened
	 * @param {Boolean} downOpen indicates whether the down side is opened
	 */
	constructor(
		layer, position, interior, wallWidth
	) {
		super(layer, position, interior.width + wallWidth * 2, interior.height + wallWidth * 2); 

		this._interior = interior;
		this._wallWidth = wallWidth;
		this._rotation = 90

		this._wallColor = "black";
		this._active = false;
		this._name = "Tank";
		this._description = "A container to hold fluids"
		this._isOpened = true;

		
		this._emptyFluid = new ContainerFluidBody(
			d3.select("[name='fluids']"),
			{x: this._position.x + this._wallWidth, y: this._position.y + this._wallWidth}, // position
			interior.width, interior.height, // dims
			interior.height * interior.width, // volume 
			new EmptyFluid() // fluid
		)
		
		// the list of fluids in the tank
		this._fluidBodies = [
			this._emptyFluid	
		] 

		this._description = [
			"Holds fluids"
		]
		
		this._temperature = 0;
	}


	/**
	 * createSnapPoints() 
	 * @description creates the snap points of the tank
	 */ 
	createSnapPoints() {
		this._snapWidth = 20;
		this._snapPoints = [

			// right
			new SnapPoint(
				{
					x: this.position.x + this.width,
					y: 0
				},
				this._snapWidth,
				this.height,
				{x: this.position.x + this.width, y: this.position.y + this.height / 2},
				"x",
				"right"
			),

			// left
			new SnapPoint(
				{
					x: this.position.x - this._snapWidth,
					y: 0
				},
				this._snapWidth,
				this.height,
				{x: this.position.x, y: this.position.y + this.height / 2},
				"x",
				"left"
			),

			// top
			new SnapPoint(
				{
					x: 0,
					y: this.position.y - this._snapWidth
				},
				this.width,
				this._snapWidth,
				{x: this.position.x + this.width / 2, y: this.position.y},
				"y",
				"up"
			),

			// bottom
			new SnapPoint(
				{
					x: 0,
					y: this.position.y + this.height
				},
				this.width,
				this._snapWidth,
				{x: this.position.x + this.width / 2, y: this.position.y + this.height},
				"y",
				"down"
			),
		]

		var i = 0;
		for (const point of this._snapPoints) {
			point.fill.color = "orange"
			point.fill.opacity = 0;
			point.stroke.color = "magenta";
			point.stroke.opacity = 1;
			this._snapGroup.add(point, i);
			i++;
		}

	}


	/**
	 * snapAdjustments() 
	 * @description these are adjustments made to the relative position of two snapping objects 
	 * @param {Pair} pair the pair of objects being snapped 
	 * @param {Rect} movingObject the object being moved
	 */
	snapAdjustments(pair) {

		if(pair.fixed.side === "left" && pair.fixed.point.x < this.center.x) {
			this.moveBy({
				x: -this.boundingBox.width,
				y: 0
			})
		} 

		if(pair.fixed.side === "right" && pair.fixed.point.x > this.center.x) {
			this.moveBy({
				x: +this.boundingBox.width,
				y: 0
			})
		} 
		

		if(pair.fixed.side === "up" && pair.fixed.point.y < this.center.y) {
			this.moveBy({
				x: 0,
				y: -this.boundingBox.height
			})
		} 

		if(pair.fixed.side === "down" && pair.fixed.point.y > this.center.y) {
			this.moveBy({
				x: 0,
				y: this.boundingBox.height
			})
		} 
	}

	

	
	/**
	 * create()
	 * @description creates the Tank
	 */
	create() {
		super.create();

		this._emptyFluid.container = this;

		this._boundingBox.stroke.color = "blue"
		this._boundingBox.stroke.opacity = 0.0
		this._boundingBox.position = this._position
		this._boundingBox.width = this._width
		this._boundingBox.height = this._height

		this._emptyFluid.stroke.opacity = 0;
		this._emptyFluid.create();
		this._graphicsGroup.add(this._emptyFluid);
		this._emptyFluid.update();

		this.update()
	}


	/**
	 * createGraphics()
	 * @description the group of that the graphic is attached to
	 * @param {SVGGroup} svgGroup the svg group to add the graphic to
	 */
	createGraphics(svgGroup) {

		let group = new Group();
		let walls = new Rect(
			svgGroup, 
			{...this.position},
			this.width,
			this.height
		)
		walls.fill.color = this._wallColor
		walls.fill.opacity = 1
		walls.stroke.opacity = 0;
		walls.create();
		group.add(walls, "walls")

		let interiorVertical = new Rect(
			svgGroup, 
			{x: this._position.x + this._wallWidth, y: this._position.y + this._wallWidth},
			this._interior.width,
			this._interior.height
		)
		interiorVertical.stroke.opacity = 0;
		interiorVertical.fill.color = "white"
		interiorVertical.fill.opacity = 1
		interiorVertical.create();
		group.add(interiorVertical, "interiorVertical")

		let interiorHorizontal = new Rect(
			svgGroup, 
			{x: this._position.x + this._wallWidth, y: this._position.y + this._wallWidth},
			this._interior.width,
			this._interior.height
		)
		interiorHorizontal.stroke.opacity = 0;
		interiorHorizontal.fill.color = "white"
		interiorHorizontal.fill.opacity = 1
		interiorHorizontal.create();
		group.add(interiorHorizontal, "interiorHorizontal")


		if(this._isOpened) {
			interiorVertical.position.y -= this._wallWidth
			interiorVertical.height += this._wallWidth
		}


		// setup liquid svg
		return group;
		
	}


	rotate() {
		this._rotation = (this._rotation + 90) % 360

		let center = this._boundingBox.center;


		this._graphicsGroup.rotateAroundPoint(center, 90);
		this._boundingBox.rotateAroundPoint(center, 90);
		for (const snapPoint of this._snapPoints) {
			snapPoint.side = getNextSide(snapPoint.side);
			snapPoint.axis = (snapPoint.axis === "x") ? "y" : "x";
			snapPoint.rotateAroundPoint(center, 90);
		}

		/*d3.select('[name="debug"]')
			.append('circle')
			.attr('r', 3)
			.style('fill', 'blue')
			.attr("cx", center.x)
			.attr("cy", center.y)
		*/


		this._position = this._boundingBox.position


	}


	/**
	 * update()
	 * @description updates the tank
	 */
	update() {

		this.updateFluidBodies()
		this._boundingBox.update();
		this._graphicsGroup.update();
		this._snapGroup.update();
		
	}


  	/**
	 * updateFluidBodies() 
	 * @description updates the svg for the liquid in the tank
	 */
	updateFluidBodies() {
		let lastY = this.getUpY()
		for (let fluidBody of this._fluidBodies) {
			fluidBody.position = {
				x: this._position.x + this._wallWidth,
				y: lastY
			}
			lastY = fluidBody.getButtomY()
			fluidBody.update();
		}
	}
	

	/**
	 * removeVolumelessFluids()
	 * @description removes any fluids that have a volume of 0
	 */
	removeVolumelessFluids() {
		let newFluidBodies = [];
		for (const fluidBody of this._fluidBodies) {
			if(!(fluidBody.fluid instanceof EmptyFluid) && fluidBody.volume <= 0) {
				fluidBody.destroy()
			} else {
				newFluidBodies.push(fluidBody);
			}
		}

		this._fluidBodies = newFluidBodies;
	}



	/**
	 * addFluid()
	 * @description adds a fluid to the tank
	 * @param {Fluid} fluid the fluid to add to the tank
	 */
	/**
	 * new fluid("Water", 1, interior.width * 10, {red: 0, green: 0, blue: 256}),
			new fluid("Olive Oil", 5, interior.width * 10, {red: 0, green: 256, blue: 0})
	 */
	addFluid(newFluid) {

		// find the empty fluid
		let emptyFluid = this.getEmptyFluid()

		// add the fluid
		if(emptyFluid.volume > 0) {
			emptyFluid.volume -= newFluid.volume;

			// search through the fluids to find the new fluid
			let i = 0;
			while(i < this._fluidBodies.length && this._fluidBodies[i].fluid.name !== newFluid.fluid.name) {
				i++;
			}

			// if it doesn't exist add it
			if(i >= this._fluidBodies.length) {
				this._graphicGroup.add(newFluid)
				this._fluidBodies.push(newFluid);
				this._fluidBodies = this._fluidBodies.sort((a, b) => a.fluid.density - b.fluid.density) 
			} else { // otherwise combine the new fluid with the existing one
				this._fluidBodies[i].volume += newFluid.volume
			}
		}
			

		this.updateFluidBodies()
	}

	/**
	 * destroySVG()
	 * @description destroys the svg for the object
	 */
	destroySVG() {
		for (const part of Object.values(this._svg)) {
			part.remove()
		}
	}


  	/**
	 *	transferLiquid()
	 *	@description transfers liquid from the tank to its connecting pipes
	 */
	transferLiquid() {
		for (const snapPoint of this._snapPoints) {
			for (const pipe of snapPoint.attachments) {
				// pipe.opened is for valves
				if(pipe instanceof Pipe && pipe.opened) {

					let drop = null;
					let firstFluid = this.getFirstAccessibleFluid(pipe, snapPoint);

					// is the direction of the pipe facing away from the tank
					let isFacingAway = (snapPoint.side === pipe.direction)

					// get a drop from the tank
					if(firstFluid && isFacingAway) {

						let dropSize = pipe.getDropSize()
						drop = firstFluid.removeDrop(dropSize)

						if(drop) {
							this.removeVolumelessFluids()
							this._emptyFluid.addDrop(drop.size)
							this.updateFluidBodies();
						}
					}

					// if pipe is there, move the drop to the pipe
					if(drop) {
						drop.position = pipe.getDropStartPoint(snapPoint, drop);
						drop.stepAlongPath = 0;

						// create the drop in the world and add it to the respective pipe
						drop.direction = pipe.direction;
						pipe.addDrop(drop);
					}
				}
			}
		}
	}


	/**
	 * heatFluidBodies() 
	 * @description heats the fluid bodies in the tank
	 * @param {World} world the world that the tank is in
	 * @param {Number} amount the amount to heat the fluid bodies by
	 * @param {HeatSource} source the heat source
	 */
	heatFluidBodies(world, amount, source) { 

		for (const fluidBody of this._fluidBodies) {
			if(
				!(fluidBody.fluid instanceof EmptyFluid) &&
				fluidBody.temperature + amount <= source.maxTemperature && 
				fluidBody.temperature + amount >= source.minTemperature
			) {
				fluidBody.heat(amount);
				fluidBody.update();

				let dropX = getRandomInt(0, this.width - this._wallWidth * 2);
				let dropSize = 5;
				let canCondense = fluidBody.isCondensing() && this.facing === "down";
				let canEvaporate = fluidBody.isBoiling() && this.facing === "up";
				let drop = (canCondense || canEvaporate) ? fluidBody.removeDrop(dropSize) : undefined;


				// add the drop to the world
				if(drop) {
					this.removeVolumelessFluids()
					this._emptyFluid.addDrop(drop.size)
					this.updateFluidBodies();
					drop.position.x = this._position.x + this._wallWidth + dropX;

					if(fluidBody.isCondensing()) {
						drop.density = 1;
						drop.position.y = fluidBody.position.y + fluidBody.height + dropSize * 2
					} else if(fluidBody.isBoiling()) {
						drop.density = -1;
						drop.position.y = fluidBody.position.y - dropSize * 2
					}

					drop.velocity = {x: 0, y: 1};

					world.addDrop(drop)
				}

			}
			
		}
	}


	/**
	 * heatLiquids() 
	 * @description heats the liquids in the tank
	 * @param world the world taht the tank is in
	 * @param temperature the additional temperature to add or subtract from the fluid in 
	 * 	in the tank temperatures
	 * @param source the heat source
	 */
	heatLiquids(world, temperature, source) {
		// whenever a liquid is heated it will sometimes produce a drop 
		this.heatFluidBodies(world, temperature, source);

		

		/*if(this._emptyFluid.volume > 0) {
			for (const fluid of this._fluidBodies) {
				
				if(!(fluid.fluid instanceof EmptyFluid)) { 
					let lastVolume = fluid.volume;
					fluid.expand(1.0005);
					fluid.heat(1);
					let diffVolume = fluid.volume - lastVolume;
					this._emptyFluid.volume -= diffVolume;
				}
			}
			this.updateFluidBodies();
		}*/
		
	}


	/**
	 * getEmptyFluid() 
	 * @description gets the empty fluid from the list of fluids
	 * @returns the empty fluid
	 */
	getEmptyFluid() {
		for (const body of this._fluidBodies) {
			if(body.fluid instanceof EmptyFluid) {
				return body;
			}
		}
	}




	/**
	 * getFirstAccessibleFluid()	
	 * @description Gets the fluid in the tank that the pipe can first access	
	 * @param {Pipe} pipe the pipe find 
	 * @param {SnapPoint} snapPoint the SnapPoint of the tank the pipe is on
	 * @returns true if the pipe has access to the fluid
	 * 			false if the pipe does not have access to the fluid
	 */
	getFirstAccessibleFluid(pipe, snapPoint) {
		let isDown = (snapPoint.side === "down")

		let lastFluid = this._fluidBodies[this._fluidBodies.length - 1];
		// get the last 
		if(isDown && !(lastFluid.fluid instanceof EmptyFluid)) {
			return lastFluid;
		}



		// search throught the list of fluids to find the first 
		// accessible one by the pipe

		for (const fluidBody of this._fluidBodies) {
			if(
				!(fluidBody.fluid instanceof EmptyFluid) && 
				(pipe.boundingBox.withinYRange(fluidBody) || fluidBody.withinYRange(pipe.boundingBox))
			) {
				return fluidBody;
			}
		}

	};


	/**
	 * getFirstFluid()	
	 * @description Gets the first fluid in the tank
	 * @returns the first fluid in the tank
	 */
	getFirstFluid() {
		let isDown = (this._rotation === 270);

		if(isDown) {
			for (let i = 0; i < this._fluidBodies.length; i++) {
				if(!(this._fluidBodies[i].fluid instanceof EmptyFluid)) {
					return this._fluidBodies[i];
				}
			}
		} else {
			for (let i = this._fluidBodies.length - 1; i > 0; i--) {
				if(!(this._fluidBodies[i].fluid instanceof EmptyFluid)) {
					return this._fluidBodies[i];
				}
			}
		}
	};

	/**
	 * addDrop()	
	 * @description adds a drop to the tank
	 * @param {Drop} drop the drop to add to the tank
	 * @returns true if the tank isn't full
	 * 			false if the tank is full
	 */
	addDrop(drop) {
		// find the empty fluid
		let emptyFluid = this.getEmptyFluid()

		// add the fluid
		if(emptyFluid.volume > 0) {
			// 400 - 100
            let extraVolume = emptyFluid.volume - drop.volume; // the amount of extra volume removed
            let newDropVolume = 0;
			
            if(extraVolume < 0) {
                newDropVolume = emptyFluid.volume;
            } else {
                newDropVolume = drop.volume
            }

            emptyFluid.volume -= drop.volume

			// search through the fluids to find the new fluid
			let i = 0;
			while(i < this._fluidBodies.length && this._fluidBodies[i].fluid.name !== drop.fluid.name) {
				i++;
			}

			// if it doesn't exist add it
			if(i >= this._fluidBodies.length) {
				let newFluid = new ContainerFluidBody(
					d3.select("[name='fluids']"), {x: 0, y: 0},
					this._interior.width, newDropVolume / this._interior.width, 
					newDropVolume, drop.fluid
				);
				newFluid.container = this;
				newFluid.create();
				this._fluidBodies.push(newFluid);
				if(this._rotation === 90) {
					this._fluidBodies = this._fluidBodies.sort((a, b) => a.fluid.density - b.fluid.density)
				} else if(this._rotation === 270) {
					this._fluidBodies = this._fluidBodies.sort((a, b) => b.fluid.density - a.fluid.density)
				}
				 
			} else { // otherwise combine the new fluid with the existing one
				this._fluidBodies[i].volume += newDropVolume				
			}
		}
			
		this.updateFluidBodies()
	};

	/**
		containsDrop()
		@description Checks to see if the drop will enter the tank
		@param {Drop} drop The drop to check
	*/
	containsDrop(drop) {
		// the tank is empty 
		if(this._fluidBodies.length === 1) {
			let yPosition;
			if(this._rotation === 90) {
				yPosition = this._boundingBox.position.y + this._boundingBox.height - this._wallWidth - 2
			} else if(this._rotation === 270) {
				yPosition = this._boundingBox.position.y + 2 
			}

			let bottomEdge = new Rect(
				d3.select("[name='debug']"),
				{
					x: this._boundingBox.position.x, 
					y: yPosition
				},
				this._boundingBox.width,
				this._wallWidth + 1
			)

			return bottomEdge.intersect(drop)

		// there is some liquid in the tank
		} else {

			return this.getFirstFluid().intersect(drop)
		}
	}

	

	/**
	 *	empty()
	 *	@description Empties the tank of all its liquid
	 */
	empty () {
		/**this.currentLevel = 0;
		this.liquid = null;
		this.text = ""

		this.updateFluidBodies();**/
	};

	

	/**
	 * getUpY()
	 * @description get the y value for the top of the tank, below the inner wall
	 */
	getUpY() {
		return this._boundingBox.y + this._wallWidth;
	}

	/**
	 * getDownY()
	 * @description get the y value for the bottom of the tank, below the inner wall
	 */
	getDownY() {
		return this._boundingBox.y + this._boundingBox.height - this._wallWidth;
	}


	/**
	 * get facing()
	 * @description gets the direction the opening of the tank is facing
	 * @returns {Direction} the direction of the opening of the tank
	 */
	get facing() {
		if(this._rotation === 90)
			return "up"
		else if(this._rotation === 180) {
			return "right"
		} else if(this._rotation === 270) {
			return "down"
		} else if(this._rotation === 0) {
			return "left"
		}
	}


	/**
	 * get wallWidth()
	 * @description gets the wall width of the tank
	 * @returns the wall width of the tank
	 */
	get wallWidth() {
		return this._wallWidth;
	}


	/**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Tank";
	}

	/**
	 * get description()
	 * @description gets the description of the tank
	 */
	get description() { 
		return this._description; 
	}

	/**
	 * get interior()
	 * @description gets the interior dimensions of the tank
	 */
	get interior() {
		return this._interior;
	}

	/**
	 * get width()
	 * @description gets the width of the tank
	 * @returns the width of the tank
	 */
	get width() {
		return this._boundingBox.width;
	}

	/**
	 * get height()
	 * @description gets the height of the tank
	 * @returns height of the tank
	 */
	get height() {
		return this._boundingBox.height;	
	}


	/**
	 * get interiorWidth()
	 * @description gets the interior width of the tank
	 */
	get interiorWidth() {
		return this._boundingBox.width - this._wallWidth * 2;
	}

	/**
	 * get interiorWidth()
	 * @description gets the interior width of the tank
	 */
	get interiorHeight() {
		return this._boundingBox.height - this._wallWidth * 2;
	}



	
	/** 
	 * get leftOpened()
	 * @description gets the left opened value
	 * @returns leftOpened
	 */
	get leftOpened() {
		return this._leftOpened;
	}

	/** 
	 * get rightOpened()
	 * @description gets the left opened value
	 * @returns rightOpened
	 */
	get rightOpened() {
		return this._rightOpened;
	}

	/** 
	 * get upOpened()
	 * @description gets the left opened value
	 * @returns upOpened
	 */
	get upOpened() {
		return this._upOpened;
	}

	/** 
	 * get downOpened()
	 * @description gets the left opened value
	 * @returns downOpened
	 */
	get downOpened() {
		return this._downOpened;
	}

	/**
	 * get boundingBox()
	 * @description gets the bounding box for this tank
	 * @returns the bounding box
	 */
	get boundingBox() {
		return this._boundingBox;
	}
}