export default class Arrow {


    constructor(layer, radius, center) {
        this._radius = radius;
        this._center = center;
        this._points = [];

        let angle = 360 / 3

		for (let i = 0; i < 3; i++) {
			this._points.push({
				x: this._center.x + this._radius * Math.cos((i * angle) * Math.PI / 180), 
				y: this._center.y + this._radius * Math.sin((i * angle) * Math.PI / 180)
            })
		}
    }


    create() {
        this._svg = this._layer.append("path")
    }


    /**
     * update() 
     * @description updates the arrow
     */
    update() {
        let path = d3.path() 
		let angle = 360 / 3

		path.moveTo(
			this.center.x + this._radius * Math.cos((0) * Math.PI / 180), 
			this.center.y + this._radius * Math.sin((0) * Math.PI / 180)
		)

		for (let i = 0; i < 4; i++) {
			path.lineTo(
				this.center.x + this._radius * Math.cos((i * angle) * Math.PI / 180), 
				this.center.y + this._radius * Math.sin((i * angle) * Math.PI / 180)
			)
		}

		this._svg
			.attr("d", path)
			.style("stroke", "red")
			.style("fill", "rgba(0, 0, 0, 0)")
    }


    /**
	 * toPoints()
	 * @description converts this rectangle to points
	 * @returns the points that make up this rectangle
	 */
	toPoints() {
        return this._points;
	}


    /**
	 * rotateAroundPoint() 
	 * @description rotates the rectangle around a point
	 * @param {Point} point the point to rotate the rectangle around
	 * @param {Degrees} angle the angle to rotate the rectangle by in degrees
	 */
	rotateAroundPoint(center, angle) {
		var points = this.toPoints()
		this.fromPoints(rotatePoints(points, center, angle));
	}

    /**
     * move() 
     * @description moves the arrow by a delta x, and y
     * @param {Number} deltaX the difference in x to move the arrow
     * @param {Number} deltaY the difference in y to move the arrow
     */
    move(deltaX, deltaY) {
        this._center.x += deltaX;
        this._center.y += deltaY;

        this._points = [];

        let angle = 360 / 3

		for (let i = 0; i < 3; i++) {
			this._points.push({
				x: this._center.x + this._radius * Math.cos((i * angle) * Math.PI / 180), 
				y: this._center.y + this._radius * Math.sin((i * angle) * Math.PI / 180)
            })
		}
    }
}