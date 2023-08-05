import Button from "../buttons/Button";
import CloseButton from "../buttons/CloseButton";

export default class Modal {


    /**
     * @description creates a modal
     * @param {Layer} layer the svg layer that this modal is on. Should be the top
     * @param {Number} width the width of the modal
     * @param {Number} height the height of the modal 
     */
    constructor(layer, position, width, height) {
        this._layer = layer; // the layer the modal is on
        this._position = position; // the position of the modal 
        this._width = width; // the width of the modal
        this._height = height; // the height of the modal
        this._isOpened = false;
        
    }


    /**
     * create() 
     * @description creates the modal
     */
    create() {
        this._group = this._layer.append("g")


        this._group
            .append("rect")
                .attr("width", this._width)
                .attr("height", this._height)
                .attr("x", this._position.x)
                .attr("y", this._position.y)
                .style("fill", "blue")
                .style("stroke", "black")


        this._button = new CloseButton(this, this._group, 
            {x: this._position.x + this._width - 25, y: this._position.y}    
        )
        this._button.create();
    }


    /**
     * addContent()
     * @description adds content to the modal
     * @param {SVGElement} content the content to add to the modal
     */
    addContent(content) {
        this._svg.group.append(content);
    }


    /**
     * close()
     * @description closes the modal
     */
    close() {
        this._group.remove();
        this._isOpened = false;
    }


    /**
     * open()
     * @description opens the modal
     */
    open() {
        this.create();
        this._isOpened = true;
    }


    /**
     * toggle() 
     * @description toggle the modal open or closed
     */
    toggle() {
        if(this._isOpened) {
            this.close();
        } else {
            this.open();
        }
    }


    /**
     * get isOpened()
     * @description gets whether the modal is opened
     */
    get isOpened() {
        return this._isOpened;
    }
}