/**
 * ModeButton
 * @description a button that selects the mode. There are three modes: place, edit, and sell
 *  Sell sells the object you click. Place places objects. Edit allows you to move objects.
 */
import { setMode } from "../../GameState";
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
    constructor(layer, position, width, height, modeSelector, mode, name) {
        super(layer, position, width, height);

        this._text = name;
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
        setMode(this._mode);

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