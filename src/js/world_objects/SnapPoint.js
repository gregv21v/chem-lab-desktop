import Rect from "../shapes/Rect";
import Snappable from "./Snappable";
import * as d3 from "d3";

/**
 * SnapPoint - the point to which two GameObjects can be snapped together
 * 
 * Make snap points rotateable 
 */
export default class SnapPoint extends Rect {
    
    /**
     * constructor()
     * @description constructs the SnapPoint
     * @param {Point} value the x or y value that the GameObject snaps to
     * @param {Area} area the snap area where snapping occurs
     * @param {String} axis the axis where snapping occurs. Can be x or y.
     */
    constructor(position, width, height, value, axis) {
        super(d3.select('[name="debug"]'), position, width, height)
        this._value = value;
        this._axis = axis;
        this._snappables = [];
    }


    /**
     * valueToPoint()
     * @description converts the value of this Snap Point to a point
     */
    valueToPoint() {
        if(this._axis === "x") {
            return {
                x: this._value,
                y: 0
            }
        } else {
            return {
                x: 0,
                y: this._value
            }
        }
    }

    


    /**
     * move() 
     * @description moves the snap point by a delta x, and y
     * @param {Number} deltaX the difference in x to move the snap point
     * @param {Number} deltaY the difference in y to move the snap point
     */
    move(deltaX, deltaY) {
        this.position.x += deltaX;
        this.position.y += deltaY;

        if(this._axis === "x") {
            this._value += deltaX;
        } else {
            this._value += deltaY;
        }
    }

    /**
     * attach()
     * @description attachs a snappable to this snap point
     * @param {Snappable} snappable the snappable to attach
     */
    attach(snappable) {
        this._snappables.push(snappable)
    }

    /**
     * get value()
     * @description gets the value of this snap point
     * @returns the value of this snap point
     */
    get value() {
        return this._value;
    }

    /**
     * set value()
     * @description sets the value of the snap point
     * @param {Number} value the x or y value of the snap point
     */
    set value(val) {
        this._value = val;
    }

    /**
     * get axis()
     * @description gets the axis of this snap point
     * @returns the axis of this snap point
     */
    get axis() {
        return this._axis;
    }

    /**
     * set axis()
     * @description sets the axis of this snap point
     * @param {String} value the new axis
     */
    set axis(value) {
        this._axis = value;
    }

    /**
     * get snappables()
     * @description gets the snappables attached to this snap point
     * @returns the snappables attached
     */
    get snappables() {
        return this._snappables;
    }


    

    
}