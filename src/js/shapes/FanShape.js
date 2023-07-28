import Shape from "./Shape";
import * as d3 from "d3";

/**
 * Fan - the graphic for the fan
 */
export default class FanShape extends Shape {

    constructor(layer, position, radius) {
        super(layer, position);
        this._radius = radius;
    }


    create() {
        this._svg = {
            blades: this._layer.append("path"),
            center: this._layer.append("circle")
        }
        

        let path = d3.path();

        path.moveTo(this._position.x, this._position.y)
        path.arc(this._position.x, this._position.y, this._radius, 0, Math.PI)
        path.arc(this._position.x + this._radius / 2 * 2, this._position.y, this._radius, Math.PI, Math.PI * 2)
        path.closePath()

        this._svg.center
            .attr("cx", this._position.x + this._radius / 2)
            .attr("cy", this._position.y)
            .attr("r", this._radius / 5)

        this._svg.blades
			.attr("d", path)
			.style("stroke", this._stroke.color)
			.style("fill", "grey")
            .style("stroke-width", 1)
            .style("stroke-opacity", 1)
            .style("stroke", "black")
            .style("fill-opacity", this._fill.opacity)


    }

    /**
     * update() 
     * @description updates the arrow
     */
    update() {
        let path = d3.path();

        path.moveTo(this._position.x, this._position.y)
        path.arc(this._position.x, this._position.y, this._radius, 0, Math.PI)
        path.arc(this._position.x + this._radius, this._position.y, this._radius, Math.PI, Math.PI * 2)
        path.closePath()

        this._svg.center
            .attr("cx", this._position.x + this._radius / 2)
            .attr("cy", this._position.y)
            .attr("r", this._radius / 5)

        this._svg.blades
			.attr("d", path)
			.style("stroke", this._stroke.color)
			.style("fill", "grey")
            .style("stroke-width", 1)
            .style("stroke-opacity", 1)
            .style("stroke", "black")
            .style("fill-opacity", this._fill.opacity)
    }

    /**
	 * scale()
	 * @description scales the rectangle by the given amount
	 * @param {Number} amount the amount to scale the rectangle by
	 */
	scale(amount) {
        this._radius *= amount;
    }

    /**
     * moveBy() 
     * @description moves the arrow by a delta x, and y
     * @param {Number} deltaX the difference in x to move the arrow
     * @param {Number} deltaY the difference in y to move the arrow
     */
    moveBy(deltaX, deltaY) {
        this._position = {
            x: this._position.x + deltaX,
            y: this._position.y + deltaY
        }
    }
}