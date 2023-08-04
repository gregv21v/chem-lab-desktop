/*
	CloseButton - A button that closes a modal window
*/
import Button from "./Button";

export default class JobsButton extends Button {

    /**
     * constructor()
     * @description constructs the button
     * @param {Player} modal the modal to open
     * @param {Layer} layer the layer the button is on
     * @param {Point} position the position of the button
     * @param {Number} width the width of the button
     * @param {Number} height the height of the button
     */
    constructor(modal, layer, position, width, height) {
        super(layer, position, width, height);

        this._text = "Jobs"
        this._modal = modal;

        this._styling = {
            color: "blue", 
            textColor: "white", 
            strokeColor: "black",
            strokeWidth: 2
        }
    }




    /**
	 * onClick()
	 * @description the function called when this button is clicked
	 */
    onClick() {
        console.log("opening jobs");
        this._modal.toggle();

        if(this._modal.isOpened) {
            this.styling = {
                strokeColor: "grey"
            }
        } else {
            this.styling = {
                strokeColor: "black"
            }
        }
    }
    
}