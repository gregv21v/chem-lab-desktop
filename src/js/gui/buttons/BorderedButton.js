/**
 * BorderedButton
 * @description a button with borders
 */

import Button from "./Button"
import * as d3 from "d3"

export default class BorderedButton extends Button {

	/**
	 * constructor()
	 * @description constructs the bordered button
	 * @param {Point} position the position of the button
	 * @param {Number} width the width of the button
	 * @param {Number} height the height of the button
	 * @param {Number} borderWidth the width of the border of the button
	 */
	constructor(position, width, height, borderWidth) {
		super(position, width, height)

		this.borderWidth = borderWidth;

		var mainSVG = d3.select("body").select("svg")
		this.svg = {
			border: mainSVG.append("rect"),
			innerRect: mainSVG.append("rect"),
			label: mainSVG.append("text"),
			clickBox: mainSVG.append("rect")
		};
	}

	/**
	 * set position
	 * @description sets the position of the Button
	 * @param {Point} value the new position of the button
	 */
	set position(value) {
		this._position = value;

		this.svg.clickBox.attr("x", this._position.x);
		this.svg.clickBox.attr("y", this._position.y);

		this.svg.border.attr("x", this._position.x);
		this.svg.border.attr("y", this._position.y);

		this.svg.innerRect.attr("x", this._position.x + this.borderWidth);
		this.svg.innerRect.attr("y", this._position.y + this.borderWidth);

		this.svg.label.attr("x", this._position.x + this.width / 2 - (this.text.length * 6) / 2);
		this.svg.label.attr("y", this._position.y + this.height / 2 + 5);
	}


	/**
	 * createBackgroundSVG() 
	 * @description creates the background for this svg 
	 */
	createBackgroundSVG() {
		// border
		this.svg.border.attr("x", this._position.x);
		this.svg.border.attr("y", this._position.y);
		this.svg.border.attr("width", this.width);
		this.svg.border.attr("height", this.height);
		this.svg.border.style("fill", "black")

		// inner rectangle
		this.svg.innerRect.attr("x", this._position.x + this.borderWidth);
		this.svg.innerRect.attr("y", this._position.y + this.borderWidth);
		this.svg.innerRect.attr("width", this.width - this.borderWidth * 2);
		this.svg.innerRect.attr("height", this.height - this.borderWidth * 2);
		this.svg.innerRect.style("fill", "white")
	}
}
