/**
 * RejectJobButton
 * @description The button to sign the contract for a job.
 */

import Button from "./Button";

export default class RejectJobButton extends Button {
    /**
	 * constructor()
	 * @description constructs the RejectJobButton
     * @param {SVGElement} layer the graphics layer to attach the button to
	 * @param {Point} position the position of the button
	 * @param {Number} width the width of the button
	 * @param {Number} height the height of the button
	 */
    constructor(layer, position, width, height, jobBoard) {
        super(layer, position, width, height);

		this._jobBoard = jobBoard;
    }

    /**
	 * onClick()
	 * @description the function called when this button is clicked
	 */
	onClick() {
		// reject the job
		// removing it from the job board
	}



}