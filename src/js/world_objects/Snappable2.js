/*
  Snappable2 - the second version of the snappable class

*/
import GameObject from "./GameObject"
import Rect from "../shapes/Rect"
import { Distance } from "../shapes/Point"
import * as d3 from "d3"
import Group from "../shapes/Group"
import SnapPoint from "./SnapPoint"

export default class Snappable2 extends GameObject {
  constructor(layer, center) {
    super(layer, center, { x: 0, y: 0 })

    this._position = { x: 0, y: 0 }
    this._rotation = 0;
    this._objectGroup = new Group(); // the place where all the graphic objects are stored

    // snap areas are the regions around a given game object
    // that will cause a another object to snap with this object

    // snap parts
    this.snapCenter = { x: 0, y: 0 }
    this._snapping = false; // determines if the object is currently snapping
    this._snapRadius = 20
  }


  // Rotating should maintain consistency
  // between the snap areas and their corresponding
  // sides.
  rotate() {
    this._rotation = (this._rotation + 90) % 360
  };



  /**
   * get rect()
   * @description gets a rectangle representing
   *  the area of the valve
   */
  get rect() {
    var newRect = new Rect();
    newRect.position = this._position
    newRect.width = this.width; // horizontal dimension
    newRect.height = this.height; //   vertical dimension

    //newRect.createSVG()
    return newRect;
  };

  /**
    moveTo()
    @description moves to a given point, where the center of the Snappable is
      fixed at the given point
    @param point the point to center on
  */
  moveTo(point) {
    this._position.x = point.x
    this._position.y = point.y
  }

  /**
   * moveRelativeToCenter()
   * @description moves the Snappable relative to it's center
   * @param point point to move to
   */
  moveRelativeToCenter(point) {
    let lastPosition = {...this._position};
		this._position.x = point.x - this.width / 2
		this._position.y = point.y - this.height / 2

		let delta = {
			x: this._position.x - lastPosition.x,
			y: this._position.y - lastPosition.y
		}

    this._objectGroup.move(delta.x, delta.y)
  }


  /**
   * showSnapAreas()
   * @description shows the snap areas
   */
  showSnapAreas() {
    this._objectGroup.create();
    this._objectGroup.update();
  };

  /**
   * hideSnapArea()
   * @description hide the snap areas
   */
  hideSnapAreas() {
    let snapAreas = this.getSnapAreas()
    for (const key of Object.keys(snapAreas)) {
      snapAreas[key].destroySVG()
    }
  };

  

 

  /**
   * findClosestSnapArea()
   * @description finds the closest snap area to a given point that intersects with this snappable
   * @param mousePos position of mouse
   */
  findClosestSnapPoint(snappable, mousePos) {
    // find the closest snappable region that
    // intersects

    var closestSnapPoint = null;
    var closestDistance = Infinity;
    var thisRect = this.rect

    for (let i = 0; i < snappable.snapGroup.objects.length; i++) {
      let snapPoint = snappable.snapGroup.objects[i]

      if(snapPoint instanceof SnapPoint) {
        var distance = Distance(snapPoint.center, mousePos)
        // find the closest intersecting snap area
        if (distance < closestDistance && thisRect.intersects(snapPoint)) {
          closestDistance = distance
          closestSnapPoint = i
          this._snapping = true;
        }
      }
    }

    return snappable.snapGroup.objects[closestSnapPoint];
  }

  /**
   * findSnapPointNearPoint()
   * @description find the closest snap point to another snap point
   * @param {Point} point the point the snap point should be near
   * @returns the index of the nearest snap point
   */
  findSnapPointNearPoint(point) {
    // find the closest snappable region that
    // intersects
    var index = 0;
    var closestDistance = Infinity;

    for (let i = 0; i < this._objectGroup.objects.length; i++) {
      let obj = this._objectGroup.objects[i];
      if(obj instanceof SnapPoint) {
        let center = obj.center
        let distance = Distance(center, point)

        // find the closest intersecting snap area
        if (distance < closestDistance && this.rect.intersects(obj)) {
          closestDistance = distance
          index = i
        }
      }
    }

    return this._objectGroup.objects[index];
  }


  /**
   * snapTo()
   * @description snaps a given object to this object depending on where the mouse is
   * @param {Snappable} snappable the snappable to snap to
   * @param {Point} mousePos the position of the mouse 
   * @returns the closest side that can be snapped to
   */
  snapTo(snappable, mousePos) {

    let snapPoint = this.findClosestSnapPoint(snappable, mousePos);

    if(snapPoint) {
      
      let point = {
        x: mousePos.x,
        y: mousePos.y
      }

      // based on the axis set the x or y position
      if(snapPoint.axis === "x") {
        if(snapPoint.value < this.position.x) { // on the right
          point.x = snapPoint.value + this.width / 2
        } else { // on the right
          point.x = snapPoint.value - this.width / 2
        }
      } else {
        if(snapPoint.value < this.position.y) { // on the bottom
          point.y = snapPoint.value + this.height / 2
        } else { // on the top
          point.y = snapPoint.value - this.height / 2
        }
      }

      this.moveRelativeToCenter(point)
      return snapPoint;
    } else {
      return null;
    }


  }

  /**
   * getSnapPointCenter() 
   * @description gets the center of a snap point. This is the point along the 
   *  edge of a snappable where two points snap
   */
  getDropStartPoint(snapPoint, drop) {
    let point = {
      x: this.position.x + drop.size / 2,
      y: this.position.y + drop.size / 2
    }

    // based on the axis set the x or y position
    if(snapPoint.axis === "x") {
      point.x = snapPoint.value - drop.size / 2
    } else {
      point.y = snapPoint.value - drop.size / 2
    }

    return point;
  }


  /**
   * get height()
   * @description the width of the shape of the object irregardless of
   * of what type of object it is
   */
  get width() {
    return -1;
  };

  /**
   * get height()
   * @description the height of the shape of the object irregardless of
   *  of what type of object it is
   */
  get height() {
    return -1;
  };


  /**
   * get snapGroup()
   * @description gets the snap group of the snappable
   * @returns {Array[SnapPoint]} the snap group of the snappable
   */
  get snapGroup() {
    return this._objectGroup;
  }

}
