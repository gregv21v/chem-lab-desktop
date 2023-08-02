/**
 * EditModeButton - is the button used to change to edit mode
 */

import Player from "../../Player";
import Button from "./Button";

export default class EditModeButton extends Button {

    /**
     * constructor()
     * @description constructs the button
     * @param {Player} player the player to place in edit mode
     * @param {Layer} layer the layer the button is on
     * @param {Point} position the position of the button
     * @param {Number} width the width of the button
     * @param {Number} height the height of the button
     */
    constructor(player, layer, position, width, height) {
        super(layer, position, width, height);

        this._text = "Edit"
        this._player = player;

        this._styling = {
            color: "red", 
            textColor: "black", 
            strokeWidth: 1
        }
    }




    /**
	 * onClick()
	 * @description the function called when this button is clicked
	 */
    onClick() {
        if(this._player.isInEditMode) {
            console.log("edit mode off");
            this._player.isInEditMode = false;
            this.styling = {
                color: "red"
            }
        } else {
            console.log("edit mode on");
            this._player.isInEditMode = true;
            this.styling = {
                color: "green"
            }
        }
    }
    
}