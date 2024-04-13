/**
 * AcceptJobButton
 * @description The button to sign the contract for a job.
 */

import { getLayers, getPlayer, getHUD } from "../../GameState";
import JobTank from "../../world_objects/tanks/JobTank";
import Button from "./Button";

export default class AcceptJobButton extends Button {
    /**
	 * constructor()
	 * @description constructs the AcceptJobButton
     * @param {SVGElement} layer the graphics layer to attach the button to
	 * @param {Point} position the position of the button
	 * @param {Number} width the width of the button
	 * @param {Number} height the height of the button
	 */
    constructor(layer, position, width, height, jobDetails, jobBoard) {
        super(layer, position, width, height);

		this._jobDetails = jobDetails; // the details of the job
		this._jobBoard = jobBoard; // the board of where the job is posted 
    }

    /**
	 * onClick()
	 * @description accepts the job when clicked
	 */
	onClick() {
		// accept the job
		// adding the job to the player and giving the player a new tank
		getPlayer().addJob(this._jobDetails);

		getHUD().inventory.add(new JobTank(getLayers()[1], {x: 0, y: 0}, {width: 50, height: 50}, 5, this._jobDetails));

		this._jobBoard.removeJob(this._jobDetails.id);

	}



}