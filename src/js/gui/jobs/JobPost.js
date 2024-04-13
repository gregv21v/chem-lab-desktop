import MultiLineText from "../MultiLineText";
import AcceptJobButton from "../buttons/AcceptJobButton";
import Button from "../buttons/Button";
import RejectJobButton from "../buttons/RejectJobButton";

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
     * @param {JobBoard} board the board to place the job post
     */
    constructor(layer, position, width, height, details, board) {
        this._layer = layer;
        this._position = position;
        this._width = width;
        this._height = height;

        this._details = details;
        this._board = board;

    }

    create() {
        this._group = this._layer.append("g")

        // what is needed
        // the name of the client 
        // payment information
        // the description of the job
        // a button for accepting the job

        // convert the description to lines
        let lines = [
            "Client Name: " + this._details.clientName,
            "Description: " + this._details.description[0] 
        ];

        lines = lines.concat(this._details.description.slice(1));
        lines = lines.concat([
            "Fluid: " + this._details.fluid.name,
            "Units Required: " + this._details.unitsRequired,
            "Pay Per Unit: " + this._details.payPerUnit
        ])

        lines = lines.concat("( id: " + this._details.id + " )");

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


        let buttonWidth = 55;
        let buttonHeight = 30;

        this._acceptButton = new AcceptJobButton(
            this._group, 
            {x: this._position.x + this._width - buttonWidth * 2 - 5 * 2, y: this._position.y + this._height - buttonHeight - 5},
            buttonWidth, buttonHeight, this._details, this._board

        )

        
        this._acceptButton.create();

        this._acceptButton.styling = {
            color: "green",
            strokeWidth: 1,
            strokeColor: "black"
        }

        this._acceptButton.text = "Accept"



        this._rejectButton = new RejectJobButton(
            this._group, 
            {x: this._position.x + this._width - buttonWidth - 5, y: this._position.y + this._height - buttonHeight - 5},
            buttonWidth, buttonHeight
        )

        
        this._rejectButton.create();

        this._rejectButton.styling = {
            color: "red",
            strokeWidth: 1,
            strokeColor: "black"
        }

        this._rejectButton.text = "Reject"

    }


    destroy() {
        this._background.remove();
        this._description.destroy();
        this._rejectButton.destroy();
        this._acceptButton.destroy();
    }

    update() {

    }



    get id() { return this._details.id; }
}