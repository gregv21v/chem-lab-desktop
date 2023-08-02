/**
 * ContainerFluidBody - a body of fluid
 */
import FluidBody from "./FluidBody";
import Drop from "./Drop";
import * as d3 from "d3"
import ToolTip from "../../gui/ToolTip";

export default class ContainerFluidBody extends FluidBody {
    /**
     * constructor()
     * @description constructs the fluid
     * @param {Container} container the container that the fluid is contained in
     * @param {Number} volume the volume of the fluid
     * @param {Fluid} fluid the fluid that this mass is made of 
     */
    constructor(layer, position, width, height, volume, fluid) {
        super(layer, position, width, height, {x: 0, y: 0}, volume, fluid)
        this._temperature = 0;

        this._tooltip = new ToolTip(
            {x: this._position.x + this._width / 2, y: this._position.y + this._height / 2},
            [
                "Name: " + this._fluid.name,  
                "Temperature: " + this._temperature
            ]
        )

        this._stroke.opacity = 0;
        
    }

    /**
     * create()
     * @description creates the svg for the fluid
     */
    create() {

        let tempPattern = this._layer.append("pattern")

		this._svg = {
			rect: this._layer.append("rect"),
            //pattern: tempPattern,
            //image: tempPattern.append("image"),
            hoverBox: d3.select("[name='debug']").append("rect")
		}
        this._tooltip.create();
        this.fill.color = this._fluid.getColorAsString()
   
        this.update();  
    }





    /**
     * update()
     * @description updates the ContainerFluidBody
     */
    update() {
        /*this._svg.pattern   
            .attr("id", "fluidPattern")
            .attr("viewBox", "0 0 50 50")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("patternUnits", "userSpaceOnUse")


        this._svg.image
            .attr("href", RockTexture)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 50)
            .attr("height", 50)*/
        
		this._svg.rect.attr("width", this.width);
		this._svg.rect.attr("height", this.height);
		this._svg.rect.attr("x", this._position.x);
		this._svg.rect.attr("y", this._position.y);
		this._svg.rect.attr("stroke-width", this._stroke.width);
		this._svg.rect.attr("stroke", this._stroke.color);
		this._svg.rect.attr("stroke-opacity", this._stroke.opacity)
		this._svg.rect.attr("fill", this._fill.color);
		this._svg.rect.attr("fill-opacity", this._fill.opacity)
            .attr("name", "ContainerFluidBody")


        this._svg.hoverBox.attr("width", this.width);
		this._svg.hoverBox.attr("height", this.height);
		this._svg.hoverBox.attr("x", this._position.x);
		this._svg.hoverBox.attr("y", this._position.y);
		this._svg.hoverBox.attr("stroke-opacity", 0)
		this._svg.hoverBox.attr("fill-opacity", 0);

        this._tooltip.description = [
            "Name: " + this._fluid.name,  
            "Temperature: " + this._temperature
        ]
        this._tooltip.update();

        let self = this;
        this._svg.hoverBox.on("mouseenter", () => {
            self._tooltip.description = [
                "Name: " + self._fluid.name,  
                "Temperature: " + self._temperature
            ]
            self._tooltip.position = {
                x: self._position.x + self.width,
                y: self._position.y
            }
            
            self._tooltip.show();
            self._tooltip.update();

        })

        this._svg.hoverBox.on("mouseleave", () => {
            self._tooltip.hide();
        })
        
	}

    /**
     * destroy()
     * @description destroy the fluid body 
     */
    destroy() {
        this._svg.hoverBox.remove()
        this._svg.rect.remove()
        this._tooltip.destroy()
    }

    /**
	 * removeDrop()
	 * @description removes a drop from the tank of size size
	 * @param {Number} size the size of the drop
	 * @returns a drop of size size 
	 */
	removeDrop (size) {
        if(this.volume <= 0) {
            return null;
        } else if(size * size <= this.volume) {
			this.volume -= size * size;
            let newDrop = new Drop(d3.select("[name='fluids']"), {x: 0, y: 0}, {x: 0, y: 0}, size, this.fluid);
            newDrop.create()
			return newDrop;
		} else {
            let dropSize = Math.round(Math.sqrt(this.volume))
            this.volume = 0
            let newDrop = new Drop(d3.select("[name='fluids']"), {x: 0, y: 0}, {x: 0, y: 0}, dropSize, this.fluid);
            newDrop.create()
            return newDrop;
        }
	}

    /**
     * expand()
     * @description expands the fluid due to tempature. Use a fraction to contract the fluid
     * @param {Number} amount amount to expand
     */
    expand(amount) {
        this._volume = this._volume * amount;
    }


    /**
     * heat()
     * @description heats or cools the fluid body
     * @param {Number} amount amount to heat or cool. Use negative for cooling
     */
    heat(amount) {
        this._temperature += amount;
    }


    /**
     * isBoiling()
     * @description checks whether the fluid is boiling
     * @returns true if the fluid body is boiling,
     *          false otherwise
     */
    isBoiling() {
        return this._temperature >= this._fluid.boilingPoint;
    }

    /**
     * isCondensing()
     * @description checks whether the fluid is condensing
     * @returns true if the fluid body is condensing
     *          false otherwise
     */
    isCondensing() {
        return this._temperature <= this._fluid.condensationPoint;
    }


    /**
     * get temperature()
     * @description gets the temperature of the fluid body
     * @returns {Number} temperature of the fluid body
     */
    get temperature() {
        return this._temperature;
    }




   

    /**
     * addDrop()
     * @description add a drop to the fluid
     * @param {Number} size the size of the drop to add
     */
    addDrop(size) {
        this.volume += size * size;
    }

    /**
     * clone()
     * @description clones the Fluid
     */
    clone() {
        return new ContainerFluidBody(this.position, this.volume, this.fluid)
    }


    /**
     * set container()
     * @description sets the container of this fluid
     */
    set container(value) {
        this._container = value;
    }

    /**
     * getButtomY() 
     * @description gets the y position at the bottom
     */
    getButtomY()  {
        return this._position.y + this.height
    }

    /**
     * get width()
     * @description gets the width of this Fluid   
     * @returns the width of this Fluid
     */
    get width() {
        return this._container.interiorWidth;
    }

    /**
     * get height()
     * @description gets the hight of this Fluid
     * @returns height
     */
    get height() {
        return this._volume / this._container.interiorWidth;
    }


    /**
     * get fluid()
     * @description gets the fluid for this FluidBody
     */
    get fluid() {
        return this._fluid;
    }

    

    /**
     * set volume()
     * @description sets the volume of the fluid
     * @param {Number} value the value to set the volume to
     */
    set volume(value) {
        if(value < 0) {
            this._volume = 0;
        } else {
            this._volume = value;
        }
    }

    /** 
     * get volume()
     * @description get the volume of the fluid
     */
    get volume() {
        return this._volume;
    }

    
}