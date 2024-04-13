import Fire from "../../shapes/Fire";
import Rect from "../../shapes/Rect";
import SnapPoint from "../SnapPoint";
import Snappable from "../Snappable";
import * as d3 from "d3";
import Tank from "../tanks/Tank";
import Group from "../../shapes/Group";
import HeatSource from "./HeatSource";

/**
 * Heater - heats the the fluid in a tank
 * 
 * Heating a fluid can change its density and maybe cause it to evaporate 
 */
export default class Heater extends HeatSource {
    /**
     * constructor()
     * @description constructs the heater
     * @param
     */
    constructor(layer, position, width, height) {
        super(layer, position, width, height);

        this._isOn = true;
        this._maxTemperature = 105
        this._minTemperature = 0;
        this._description = [
            "Heaters heat the fluids in",
            "tanks causing the liquids",
            "to expand"
        ];
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
					y: this._position.y
				},
				this.width,
				this._snapWidth,
				{x: this._position.x + this._width, y: this._position.y},
				"y",
				"up"
			)
		]

		for (const point of this._snapPoints) {
			point.fill.color = "orange"
			point.fill.opacity = 0.0;
			point.stroke.opacity = 1;
			this._snapGroup.add(point);
		}

	}



    create() {
        super.create();

        this._boundingBox.position = this._position;
        this._boundingBox.width = this._width;
        this._boundingBox.height = this._height + 20;
		this._boundingBox.fill.opacity = 0.0
        this._boundingBox.fill.color = "blue"
		this._boundingBox.stroke.opacity = 1;

        this.update();
	}


    /**
     * createGraphics()
     * @description creates the graphics for the heater 
     * @param {SVGElement} svgGroup the group to create the graphics for
     */
    createGraphics(svgGroup) {

        let hotPlateHeight = 10;
        let offset = 10;
        let additionalOffset = 20
        let delta = 0// the difference in height between the orange and red flames

        let redMax = 20
        let group = new Group(svgGroup);
        let redFire = new Fire(
            svgGroup,
            {
                x: this._position.x, 
                y: this._position.y + this._height - hotPlateHeight - redMax - offset - 5 + additionalOffset
            },
            this._width,
            redMax, // max
            8, // min
            offset + 5, // offset
            20 // flameCount
        )

        redFire.fill.color = "red"
        redFire.fill.opacity = (this._isOn ? 1 : 0)
        redFire.create();
        group.add(redFire, "redFire");




        let orangeMax = 10
        let orangeFire = new Fire(
            svgGroup,
            {
                x: this._position.x + 30 / this._width, 
                y: this._position.y + this._height - hotPlateHeight - orangeMax - offset + additionalOffset
            },
            this._width - 60 / this._width,
            orangeMax, // max
            5, // min
            offset, // offset
            16 // flameCount
        )

        orangeFire.fill.color = "orange"
        orangeFire.fill.opacity = (this._isOn ? 1 : 0)
        orangeFire.create();
        group.add(orangeFire, "orangeFire");



        let hotPlate = new Rect(
            svgGroup,
            {
                x: this._position.x, 
                y: this._position.y + this._height - hotPlateHeight + additionalOffset
            },
            this._width,
            hotPlateHeight
        )

        hotPlate.fill.color = "black"
        hotPlate.fill.opacity = 1;
        hotPlate.create();
        group.add(hotPlate, "hotPlate")


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
     * heat()
     * @description uses the heater to heat something
     * @param {World} world The world that the heater is in
     */
    heat(world) {
        let top = this._snapPoints[0].attachments[0];

        if(top instanceof Tank) {
            top.heatLiquids(world, 1, this);
        }
    }


    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Heater"
	}

    /**
     * get height()
     * @description the width of the shape of the object irregardless of
     * of what type of object it is
     */
    get width() {
        return this._width;
    };

    /**
     * get height()
     * @description the height of the shape of the object irregardless of
     *  of what type of object it is
     */
    get height() {
        return this._height;
    };



    /**
     * get description()
     * @description the description of what the object does
     *
     */
    get description() {
        return this._description;
    }
}


