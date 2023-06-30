import Fire from "../shapes/Fire";
import Rect from "../shapes/Rect";
import SnapPoint from "./SnapPoint";
import Snappable2 from "./Snappable2";
import * as d3 from "d3";
import Tank from "./tanks/Tank";

/**
 * Heater - heats the the fluid in a tank
 * 
 * Heating a fluid can change its density and maybe cause it to evaporate 
 */
export default class Heater extends Snappable2 {
    /**
     * constructor()
     * @description constructs the heater
     * @param
     */
    constructor(layer, position, width, height) {
        super(layer, position, width, height);

        this._isOn = true;
        this._tempature = 5;
        this._description = [
            "Heaters heat the",
            "fluids in",  
            "tanks causing the",
            "liquids to expand"
        ]
    }


    /**
	 * createSnapPoint() 
	 * @description creates the snap points of the tank
	 */ 
	createSnapPoints() {
		this._snapWidth = 20;
		this._snapPoints = [

			// top
			new SnapPoint(
				{
					x: 0,
					y: this._boundingBox.position.y - this._snapWidth
				},
				this.width,
				this._snapWidth,
				{x: this.position.x + this.width / 2, y: this._boundingBox.position.y},
				"y",
				"up"
			)
		]

		for (const point of this._snapPoints) {
			point.fill.color = "orange"
			point.fill.opacity = 0;
			point.stroke.opacity = 0;
			point.create();
			this._objectGroup.add(point);
		}

	}



    create() {
		this._group = this._layer.append("g")
		this._group.attr("name", "Pipe")

        this._boundingBox = new Rect(
			d3.select('[name="debug"]'),
			{
                x: this._position.x,
                y: this._position.y - 31 + 20 - 10
            },
			this.width,
			this.height + 10
		)
		this._boundingBox.fill.opacity = 0
        this._boundingBox.fill.color = "blue"
		this._boundingBox.stroke.opacity = 0;

		this._boundingBox.create();
		this._objectGroup.add(this._boundingBox);


		this.createGraphics();
		this.createSnapPoints();

        this.update();
	}





    /**
     * createGraphics()
     * @description creates the graphics for the heater 
     */
    createGraphics() {

        this._redFire = new Fire(
            d3.select("[name='fluids']"),
            {x: this._position.x, y: this._position.y - 28 - 3},
            this._width,
            30, // height
            20, // max
            8, // min
            10, // offset
            20 // flameCount
        )

        this._redFire.fill.color = "red"
        this._redFire.fill.opacity = (this._isOn ? 1 : 0)
        this._redFire.create();
        this._objectGroup.add(this._redFire);

        this._orangeFire = new Fire(
            d3.select("[name='fluids']"),
            {x: this._position.x + 20 / this._width, y: this._position.y + 6 - 20},
            this._width - 40 / this._width,
            30, // height
            10, // max
            5, // min
            10, // offset
            16 // flameCount
        )

        this._orangeFire.fill.color = "orange"
        this._orangeFire.fill.opacity = (this._isOn ? 1 : 0)
        this._orangeFire.create();
        this._objectGroup.add(this._orangeFire);


        this._hotPlate = new Rect(
            d3.select("[name='fluids']"),
            {x: this._position.x, y: this._position.y},
            this._width,
            10
        )

        this._hotPlate.fill.color = "black"
        this._hotPlate.fill.opacity = 1;
        this._hotPlate.create();
        this._objectGroup.add(this._hotPlate)


        

    }


    /**
	 * snapAdjustments() 
	 * @description these are adjustments made to the relative position of two snapping objects 
	 * @param {Pair} pair the pair of objects being snapped 
	 * @param {Rect} movingObject the object being moved
	 */
	snapAdjustments(pair) {
		if(pair.fixed.side === "left" && pair.fixed.point.x < this.center.x) {
			this.moveBy({
				x: -this.boundingBox.width,
				y: 0
			})
		} 

		if(pair.fixed.side === "right" && pair.fixed.point.x > this.center.x) {
			this.moveBy({
				x: +this.boundingBox.width,
				y: 0
			})
		} 
		

		if(pair.fixed.side === "up" && pair.fixed.point.y < this.center.y) {
			this.moveBy({
				x: 0,
				y: -this.boundingBox.height
			})
		} 

		if(pair.fixed.side === "down" && pair.fixed.point.y > this.center.y) {
			this.moveBy({
				x: 0,
				y: this.boundingBox.height
			})
		} 
	}



    /**
     * heat()
     * @description uses the heater to heat something
     * @param {World} world The world that the heater is in
     */
    heat(world) {
        let top = this._snapPoints[0].attachments[0];

        if(top instanceof Tank) {
            top.heatLiquids(world);
        }
    }


    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Heater"
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
}


