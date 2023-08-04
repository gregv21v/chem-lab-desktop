/*
	CloseButton - A button that closes a modal window
*/
import Button from "./Button";

export default class CloseButton extends Button {

    /**
     * constructor()
     * @description constructs the button
     * @param {Player} modal the modal to close
     * @param {Layer} layer the layer the button is on
     * @param {Point} position the position of the button
     * @param {Number} width the width of the button
     * @param {Number} height the height of the button
     */
    constructor(modal, layer, position) {
        super(layer, position, 25, 25);

        this._text = "x"
        this._modal = modal;

        this._styling = {
            color: "black", 
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
		console.log("Closing Window");
		this._modal.close();
    }
    
}