import Rect from "../../shapes/Rect";
import SnapPoint from "../SnapPoint";
import Snappable from "../Snappable";
import Tank from "../tanks/Tank";
import FanShape from "../../shapes/FanShape";
import Group from "../../shapes/Group";
import * as d3 from "d3";
import HeatSource from "./HeatSource";

/**
 * Heater - heats the the fluid in a tank
 * 
 * Heating a fluid can change its density and maybe cause it to evaporate 
 */
export default class Fan extends HeatSource {
    /**
     * constructor()
     * @description constructs the heater
     * @param {Game} game the game 
     * @param {Point} the position of the Fan
     * @param {Number} radius the radius of the Fan
     */
    constructor(game, layer, position, radius) {
        super(game, layer, position, radius, radius);
        this._radius = radius;

        this._isOn = true;
        this._description = [
            "Fans cool the fluids in",
            "tanks causing the liquids",
            "to condense"
        ];

        this._maxTemperature = 0;
        this._minTemperature = -100;
    }


    /**
	 * createSnapPoint() 
	 * @description creates the snap points of the tank
	 */ 
	createSnapPoints() {
		this._snapWidth = 20;
		this._snapPoints = [

			// top
			new SnapPoint(
				{
					x: 0,
					y: this._boundingBox.position.y - this._snapWidth
				},
				this._boundingBox.width,
				this._snapWidth,
				{x: 0, y: 0},
				"y",
				"up"
			),


            // bottom
			new SnapPoint(
				{
					x: 0,
					y: this._boundingBox.position.y + this._boundingBox.height
				},
				this._boundingBox.width,
				this._snapWidth,
				{x: 0, y: 0},
				"y",
				"down"
			)
		]

		for (const point of this._snapPoints) {
			point.fill.color = "orange"
			point.fill.opacity = 0.0;
			point.stroke.opacity = 0.0;
			point.create();
			this._snapGroup.add(point);
		}

	}



    create() {
        super.create();

        this._boundingBox.width = this._radius * 3;
        this._boundingBox.height = this._radius * 2;
		this._boundingBox.fill.opacity = 0.0
        this._boundingBox.fill.color = "blue"
		this._boundingBox.stroke.opacity = 0.0;

        this.update();
	}


    /**
     * createGraphics()
     * @description creates the graphics for the heater 
     * @param {SVGElement} svgGroup the group to create the graphics for
     */
    createGraphics(svgGroup) {

        let group = new Group(svgGroup);
        let fan = new FanShape(
            svgGroup,
            {
                x: this._position.x + this._radius, 
                y: this._position.y + this._radius
            },
            this._radius
        )
        fan.create();
        group.add(fan)

        return group;
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
     * moveTo()
     * @description moves to a given point, where the center of the Snappable is
     *  fixed at the given point
     * @param point the point to center on
     */
    moveTo(point) {
        super.moveTo(point);
    }


    /**
     * heat()
     * @description uses the heater to heat something
     * @param {World} world The world that the heater is in
     */
    heat(world) {
        let top = this._snapPoints[0].attachments[0];
        let bottom = this._snapPoints[1].attachments[0];

        if(top instanceof Tank) {
            top.heatLiquids(world, -1, this);
        }

        if(bottom instanceof Tank) {
            bottom.heatLiquids(world, -1, this);
        }
    }


    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Fan"
	}

    /**
     * get height()
     * @description the width of the shape of the object irregardless of
     * of what type of object it is
     */
    get width() {
        return this._radius;
    }

    /**
     * get height()
     * @description the height of the shape of the object irregardless of
     *  of what type of object it is
     */
    get height() {
        return this._radius;
    }


}


