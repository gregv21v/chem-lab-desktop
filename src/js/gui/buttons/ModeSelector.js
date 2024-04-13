/**
 * ModeSelector()
 * @description a way of selecting different modes
 */

import { getMode } from "../../GameState";
import Label from "../Label";
import ModeButton from "./ModeButton";


export default class ModeSelector {


    /**
     * constructor()
     * @description constructs the ModeSelector
     * @param {Layer} layer the layer the ModeSelector is on
     * @param {Point} position the position of the ModeSelector
     * @param {Number} width the width of the ModeSelector
     * @param {Number} height the height of the ModeSelector
     */
    constructor(player, layer, position, width, height) {
        this._player = player;
        this._layer = layer;
        this._position = position;
        this._width = width;
        this._height = height;
    }


    /**
     * create() 
     * @description creates the ModeSelector
     */
    create() {
        let modeNames = ["Place", "Edit", "Sell"] // the names of the modes
        let buttonHeight = this._height / 2; // the height of the button
        let buttonWidth = this._width / modeNames.length // the width of the button
        this._modeButtons = []; // the mode buttons

        // a label that describes the modes selector
        let label = new Label(
            this._layer, 
            {x: this._position.x, y: this._position.y},
            this._width, buttonHeight
        )
        label.create();
        label.text = "Modes"
        label.styling = {
            color: "teal",
            textColor: "white"
        }
        

        // create the mode buttons
        for (let i = 0; i < modeNames.length; i++) {
            let newButton = new ModeButton(
                this._layer,
                {x: this._position.x + i * buttonWidth, y: this._position.y + buttonHeight},
                buttonWidth, buttonHeight,
                this, 
                i, modeNames[i]
            )
            this._modeButtons.push(newButton)
            newButton.create();
            newButton.styling = {
                color: "teal",
                textColor: "white",
            }
        }

        this.update();
    }



    /**
     * update()
     * @description updates the graphics for the mode selector
     */
    update() {
        for (const button of this._modeButtons) {
            if(button.mode === getMode()) {
                button.styling = {
                    strokeColor: "black"
                }
            } else {
                button.styling = {
                    strokeColor: "grey"
                }
            }
        }
    }
}