/**
 * Pipe - a pipe
 */

import Snappable from "../Snappable";
import Tank from "../tanks/Tank"
import * as d3 from "d3"
import Rect from "../../shapes/Rect";
import Snappable2 from "../Snappable2";
import SnapPoint from "../SnapPoint";
import Group from "../../shapes/Group";
import Arrow from "../../shapes/Arrow";

export default class Pipe extends Snappable2 {


	/**
	 * constructor()
	 * @description constructs the pipe
	 * @param {Vector} center the center of the pipe
	 * @param {Number} width the width of the pipe
	 * @param {Number} interiorHeight the interior height of the pipe
	 * @param {Number} wallWidth the wall width of the pipe
	 */
	constructor(layer, center, length, interiorHeight, wallWidth) {
		super(layer, center)

		this._diameter = interiorHeight + wallWidth * 2;
		this._length = length;

		this._wallWidth = wallWidth;
		this._interiorHeight = interiorHeight;
		this._position = center
		//this.center = center; // position of pipe
		this._width = length;
		this._opened = true;

		this._drops = [];

		this._rect = new Rect(this.position, this.width, this.height);
		this._rotation = 0;
		this._direction = "right"

		//this.updatePosition();

  	}

	/**
	 * createSnapPoint() 
	 * @description creates the snap points of the tank
	 */ 
	createSnapPoints() {
		this._snapWidth = 20;

		// start
		let start = new SnapPoint(
			{
				x: this.position.x + this.width,
				y: 0
			},
			this._snapWidth,
			this.height,
			{
				x: this.position.x + this.width,
				y: this.position.y + this.height / 2
			},
			"x",
			"left"
		)
		start.fill.opacity = 0.5;
		start.stroke.opacity = 0;
		start.fill.color = "orange"
		this._objectGroup.add(start);

		

		// end
		let end = new SnapPoint(
			{
				x: this.position.x - this._snapWidth,
				y: 0
			},
			this._snapWidth,
			this.height,
			{
				x: this.position.x, 
				y: this.position.y + this.height / 2
			},
			"x",
			"right"
		)
		end.fill.opacity = 0.5;
		end.stroke.opacity = 0;
		end.fill.color = "orange"
		this._objectGroup.add(end);
	}


	

	/**
	 * getDropStartPosition()
	 * @description gets the start position of the drop in the pipe
	 * @param {Side} side the side of the tank the pipe is on
	 */
	getDropStartPosition(snapPoint) {
		return this.getSnapPointCenter(snapPoint);
	}

  	/***
   	 * transferLiquid()
   	 * @description transfers liquid to connected tanks
  	 */
  	transferLiquid() {
		for (const snapPoint of this._objectGroup.objects) {
			if(snapPoint instanceof SnapPoint) {
				for (const snappable of snapPoint.snappables) {
					if(snappable instanceof Tank) {
						let exitingDrops = this.takeExitingDrops(snapPoint); // take the exiting drops
						for(const drop of exitingDrops) {
							snappable.addDrop(drop);
							drop.destroy()
							snappable.updateFluidBodies()
						}
					}
				}
			}
		}
  	}

	

	/**
	 * @description adds a drop to the pipe
	 * @param {Drop} drop the drop to add
	 */
	addDrop (drop) {
		this._drops.push(drop)
	};

	/**
	 * takeExitingDrops()
	 * @description takes the exiting drops from the pipe
	 */
	takeExitingDrops(snapPoint) {

		// search for available drops
		var exitingDrops = []; // drops at their exit.
		var keptDrops = []; // drops that are not about to exit
		for(const drop of this._drops) {
			//debugger
			//console.log(drop);
			// if a drop can no longer flow in the direction it was
			// flowing, give it is at its spout, and ready to leak.
			if(!drop.canFlow(this) /*&& side === drop.direction*/) {
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
		this._group.attr("name", "Pipe")

		this.createGraphics();
		this.createSnapPoints();
		this._objectGroup.create();
	}


	/**
	 * createGraphics()
	 * @description creates the graphics for the pipe 
	 */
	createGraphics() {
		this._boundingBox = new Rect(
			d3.select('[name="debug"]'),
			{...this.position},
			this.width,
			this.height
		)
		this._boundingBox.fill.opacity = 0
		this._boundingBox.stroke.opacity = 0;
		this._objectGroup.add(this._boundingBox);

		
		//this._arrow = new Arrow(this._group, this._interiorHeight / 2, this.center)
		//this._objectGroup.add(this._arrow)

		this._walls = new Rect(
			this._group, 
			{...this.position},
			this._length,
			this._diameter
		)
		this._walls.fill.color = "black"
		this._walls.fill.opacity = 1
		this._walls.stroke.color = "black"
		this._walls.stroke.opacity = 0;
		this._objectGroup.add(this._walls)

		this._interior = new Rect(
			this._group, 
			{x: this._position.x - this._wallWidth, y: this._position.y + this._wallWidth},
			this._length + this._wallWidth * 2,
			this._interiorHeight
		)
		this._interior.stroke.opacity = 0;
		this._interior.fill.color = "white"
		this._interior.fill.opacity = 1
		this._objectGroup.add(this._interior)

	}


	update() {
		this._objectGroup.update();
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

		if(this._rotation === 0) {
			this._direction = "right"
		} else { 
			this._direction = "down"
		}

		for (const snap of this._objectGroup.objects) {
			if(snap instanceof SnapPoint) {
				snap.axis = (snap.axis === "x") ? "y" : "x"
			}
		}
		this._objectGroup.rotateAroundCenter(90)
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
	 * get length()
	 * @description gets the length of the pipe
	 * @returns the length of the pipe
	 */
	get length() {
		return this._length;
	}

	/**
	 * get diameter() 
	 * @description gets the diameter of the pipe
	 */
	get diameter() {
		return this._diameter;
	}

	/**
	 * set diameter() 
	 * @description sets the diameter of the pipe
	 * @param {Number} value the new diamater
	 */
	set diameter(value) {
		this._diameter = value;
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


	/**
	 * get direction
	 * @description gets the direction drops flow through this Pipe
	 */
	get direction() {
		return this._direction;	
	}


	/**
	 * get boundingBox()
	 * @description gets the bounding box for this pipe
	 * @returns the bounding box
	 */
	get boundingBox() {
		return this._boundingBox;
	}


}
