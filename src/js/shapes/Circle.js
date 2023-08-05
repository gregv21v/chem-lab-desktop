/**
 * Circle - a circle
 * 
 */
import * as d3 from "d3"
import { Distance } from "./Point";
import Shape from "./Shape";

export default class Circle extends Shape {

	/**
	 * constructor()
	 * @param {Point} center the center of the circle
	 * @param {Number} radius the radius of the circle
	 */
	constructor(layer, center, radius) {
		super(layer);
		this._radius = radius;
		this._position = center;		
	}


	/**
	 * create()
	 * @description creates the graphic
	 */
	create() {
		this._svg = this._layer.append("circle");

		this.update();
	}


	update() {
		this._svg
			.attr("r", this._radius)
			.attr("cx", this.center.x)
		 	.attr("cy", this.center.y)

		this.updateStyles();
	}

	/**
	 * toPoints()
	 * @description converts the circle to points
	 */
	toPoints() {
		let sides = 6;
		let angle = 360 / sides
		let points = [];

		for (let i = 0; i < sides; i++) {
			points.push({
				x: this.center.x + this._radius * Math.cos((i * angle) * Math.PI / 180), 
				y: this.center.y + this._radius * Math.sin((i * angle) * Math.PI / 180)
            })
		}

		return points;
	}

	/**
     * moveBy() 
     * @description moves the circle by a delta x, and y
     * @param {Number} deltaX the difference in x to move the circle
     * @param {Number} deltaY the difference in y to move the circle
     */
    moveBy(deltaX, deltaY) {
        this.center.x += deltaX;
        this.center.y += deltaY;
    }


	/**
	 * moveTo()
	 * @description move the circle to the specified location
	 * @param {Number} x the x coordinate to move the circle to
	 * @param {Number} y the y coordinate to move the circle to
	 */
	moveTo(x, y) {
		this._position.x = x;
		this._position.y = y;
	}

	/**
	 * contains()
	 * @description checks whether the given point is within the circle
	 * @param {Point} point the point to check for containment
	 * @returns true if the point is within the circle, false otherwise
	 */
	contains (point) {
	  return Distance(this.center, point) <= this._radius;
	}

	/**
	 * set center()
	 * @description sets the center of the circle
	 * @param {Number} center the center of the circle
	 */
	set center(value) {
		this._position = value;
	}

	/**
	 * get center() 
	 * @description gets the center of the circle
	 * @return {Point} the center of the circle
	 */
	get center() {
		return this._position;
	}


	/**
	 * get svg()
	 * @description gets the svg
	 * @return {SVG} the svg
	 */
	get svg() {
		return this._svg;
	}


}
