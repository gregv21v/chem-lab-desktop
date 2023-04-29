
export default class Group {
    /**
     * constructor()
     * @description constructs the group
     */
    constructor() {
        this._objects = [];
    }


    /**
     * rotateAroundCenter()
     * @description rotates the group around its center
     */
    rotateAroundCenter(angle) {
        // find the center
        let center = this.center;

        for (const obj of this._objects) {
            obj.rotateAroundPoint(center, angle)
        }
    }


    /**
     * update() 
     * @description updates the objects in the group
     */
    update() {
        for (const obj of this._objects) {
            obj.update()
        }
    }

    /**
     * create()
     * @description creates the objects in the group
     */
    create() {
        for (const obj of this._objects) {
            obj.create()
        }
    }


    /**
     * add()
     * @description adds a shape to the group
     * @param {Shape} shape the shape to add to the group
     */
    add(shape) {
        this._objects.push(shape)
    }


    /**
     * get center()
     * @description gets the center of the group
     */
    get center() {
        // convert every shape in the group to points
        // the calculate the center by averaging the points
        let total = {
            x: 0,
            y: 0
        }
        for (const obj of this._objects) {
            total.x += obj.center.x 
            total.y += obj.center.y 
        }

        return {
            x: total.x / this._objects.length,
            y: total.y / this._objects.length
        }
    }


    /**
     * get objects()
     * @description gets the objects in the group
     */
    get objects() {
        return this._objects;
    }

    /**
     * findObjectNearestPoint()
     * @description find the object closest to a point
     * @param {Point} point the point the object should be near
     * @returns the nearest object
     */
    findObjectNearestPoint(point) {
        // find the closest snappable region that
        // intersects

        var index = 0;
        var closestDistance = Infinity;


        for (let i = 0; i < this.objects.length; i++) {
            let center = this.center
            let distance = Distance(center, point)

            // find the closest intersecting snap area
            if (distance < closestDistance) {
                closestDistance = distance
                index = i
            }
        }

        return this.objects[index];
    }


    /**
     * move()
     * @description moves the group()
     * @param {Number} deltaX the difference in x to move the group
     * @param {Number} deltaY the difference in y to move the group
     */
    move(deltaX, deltaY) {
        for (const obj of this._objects) {
			obj.move(deltaX, deltaY)
		}
    }


}