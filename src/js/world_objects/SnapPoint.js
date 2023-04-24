
/**
 * SnapPoint - the point to which two GameObjects can be snapped together
 * 
 * 
 */
export default class SnapPoint {
    
    /**
     * constructor()
     * @description constructs the SnapPoint
     * @param {Point} point the local location of the SnapPoint relative to the GameObject
     * @param {Area} area the snap area where snapping occurs
     * @param {String} axis the axis where snapping occurs. Can be x or y.
     */
    constructor(point, area, axis) {
        this._point = point;
        this._area = area;
        this._axis = axis;
    }
}