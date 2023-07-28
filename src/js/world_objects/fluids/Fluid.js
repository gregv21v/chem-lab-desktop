import Rect from "../../shapes/Rect";
import Drop from "./Drop";

/**
 * Fluid - a fluid is a gas or a liquid
 */
export default class Fluid {
    /**
     * constructor()
     * @description constructs the fluid
     * @param {String} name the name of the fluid
     * @param {Number} density the density of the fluid
     * @param {Number} volume the volume of the fluid
     * @param {Color} color the color of the fluid
     */
    constructor(name, density, heatedDensityMultiplier, boilingPoint, condensationPoint, color) {
        this._color = color; // the color of the fluid
        this._name = name; // the name of the fluid
        this._density = density; // the density of the fluid
        this._heatedDensityMultiplier = heatedDensityMultiplier
        this._boilingPoint = boilingPoint // the point at which this fluid turns to gas
        this._condensationPoint = condensationPoint // the point at which this fluid turns to liquid
    }

    /**
     * getColorAsString()
     * @returns the getColorAsString of the fluid
     */
    getColorAsString() {
        return "rgba(" + this._color.red + "," + this._color.green + "," + this._color.blue + "," + this._color.alpha + ")";
    }

    /**
     * get name()
     * @description gets the name for this fluid
     */
    get name() {
        return this._name;
    }

    /**
     * get density()
     * @description gets the density of the fluid
     */
    get density() {
        return this._density
    }


    /**
     * get boilingPoint()
     * @description gets the boilingPoint of the fluid
     */
    get boilingPoint() {
        return this._boilingPoint;
    }

    /**
     * get heatedDensityMultiplier()
     * @description gets the heatedDensityMultiplier of the fluid
     */
    get heatedDensityMultiplier() {
        return this._heatedDensityMultiplier
    }

    /**
     * get color()
     * @description gets the density of the fluid
     */
    get color() {
        return this._color
    }

    
}