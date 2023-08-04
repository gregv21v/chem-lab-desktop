/**
 * EditModeButton - is the button used to change to edit mode
 */

import Player from "../../Player";
import Button from "./Button";

export default class ModeButton extends Button {

    /**
     * constructor()
     * @description constructs the button
     * @param {Player} player the player to place in edit mode
     * @param {Layer} layer the layer the button is on
     * @param {Point} position the position of the button
     * @param {Number} width the width of the button
     * @param {Number} height the height of the button
     */
    constructor(layer, position, width, height, player, modeSelector, mode, name) {
        super(layer, position, width, height);

        this._text = name
        this._player = player;
        this._mode = mode;
        this._modeSelector = modeSelector;

        this._styling = {
            color: "teal", 
            textColor: "black",
            strokeColor: "black", 
            strokeWidth: 2
        }
    }




    /**
	 * onClick()
	 * @description the function called when this button is clicked
	 */
    onClick() {
        this._player.mode = this._mode;

        this._modeSelector.update();
    }


    /**
     * get mode()
     * @description gets the mode of this button
     */
    get mode() {
        return this._mode;
    }
    
}