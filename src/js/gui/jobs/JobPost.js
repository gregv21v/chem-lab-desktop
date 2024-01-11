import MultiLineText from "../MultiLineText";
import Button from "../buttons/Button";

/**
 * JobPost - a job that the player can take
 */
export default class JobPost {

    /**
     * cosntructor()
     * @description constructs the job post
     * @param {Layer} layer the layer to place the job post on
     * @param {Point} point the point to place the job post at
     * @param {Number} width the width of the job post
     * @param {Number} height the height of the job post
     * @param {JobDetails} details the details of the job post
     */
    constructor(layer, position, width, height, details) {
        this._layer = layer;
        this._position = position;
        this._width = width;
        this._height = height;

        this._details = details;

    }

    create() {
        this._group = this._layer.append("g")

        // what is needed
        // a place for the name of the client 
        // a place for payment information
        // a place for the description of the job
        // a button for signing a contract

        // convert the description to lines
        let lines = [
            "Client Name: " + this._details.clientName,
            "Description: " + this._details.description[0]
        ]

        lines = lines.concat(this._details.description.slice(1))

        lines = lines.concat([
            "Fluid: " + this._details.fluid.name,
            "Units Required: " + this._details.unitsRequired,
            "Pay Per Unit: " + this._details.payPerUnit
        ])

        this._background = this._group.append("rect")
            .attr("x", this._position.x)
            .attr("y", this._position.y)
            .attr("width", this._width)
            .attr("height", this._height)
            .style("fill", "rgb(0, 102, 204)")
            .style("stroke", "black")

        this._description = new MultiLineText(
            this._group, 
            lines,
            {x: this._position.x + 10, y: this._position.y + 20} 
        )

        this._description.create();

        this._signContractButton = new Button(
            this._group, 
            {x: this._position.x + this._width - 100 - 5, y: this._position.y + this._height - 30 - 5},
            100, 30
        )

        
        this._signContractButton.create();

        this._signContractButton.styling = {
            color: "skyblue",
            strokeWidth: 1,
            strokeColor: "black"
        }

        this._signContractButton.text = "Sign Contract"

    }

    update() {

    }
}