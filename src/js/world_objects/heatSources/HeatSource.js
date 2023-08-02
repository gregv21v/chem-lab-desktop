import Fire from "../../shapes/Fire";
import Rect from "../../shapes/Rect";
import SnapPoint from "../SnapPoint";
import Snappable from "../Snappable";
import * as d3 from "d3";
import Tank from "../tanks/Tank";
import Group from "../../shapes/Group";

/**
 * Heater - heats the the fluid in a tank
 * 
 * Heating a fluid can change its density and maybe cause it to evaporate 
 */
export default class HeatSource extends Snappable {
    /**
     * constructor()
     * @description constructs the heater
     * @param {Layer} layer layer the heat source is on 
     * @param {Point} position the position of the heat source
     * @param {Number} width the width of the heat source
     * @param {Number} height the height of the heat source
     */
    constructor(world, player, layer, position, width, height) {
        super(world, player, layer, position, width, height);

        this._isOn = true;
        // the maximum temperature the source can heat an connected object to 
        this._maxTemperature = 105; 

        // the minimum temperature the source can heat an connected object to 
        this._minTemperature = 0;
        this._description = [
            "Heat source", "Something that heats or cools a fluid"
        ];
    }


    /**
	 * createSnapPoint() 
	 * @description creates the snap points of the tank
	 */ 
	createSnapPoints() {

	}



    create() {
		
	}


    /**
     * createGraphics()
     * @description creates the graphics for the heater 
     * @param {SVGElement} svgGroup the group to create the graphics for
     */
    createGraphics(svgGroup) {
        return null;
    }


    /**
	 * snapAdjustments() 
	 * @description these are adjustments made to the relative position of two snapping objects 
	 * @param {Pair} pair the pair of objects being snapped 
	 * @param {Rect} movingObject the object being moved
	 */
	snapAdjustments(pair) {
		
	}



    /**
     * heat()
     * @description uses the heater to heat something
     * @param {World} world The world that the heater is in
     */
    heat(world) {
        
    }


    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Heat Source"
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



    /**
     * get maxTemperature()
     * @description the maximum temperature this heat source an get to 
     */
    get maxTemperature() {
        return this._maxTemperature;
    }

    /**
     * get minTemperature()
     * @description the minimum temperature this heat source an get to 
     */
    get minTemperature() {
        return this._minTemperature;
    }
}


