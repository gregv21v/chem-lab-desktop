/**
 * ModeSelector - a way to select the game mode
 */

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
        let modes = ["Place", "Edit", "Sell"]
        let buttonHeight = this._height / 2;
        let buttonWidth = this._width / modes.length
        this._modeButtons = [];

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
        

        for (let i = 0; i < modes.length; i++) {
            let newButton = new ModeButton(
                this._layer,
                {x: this._position.x + i * buttonWidth, y: this._position.y + buttonHeight},
                buttonWidth, buttonHeight,
                this._player,
                this, 
                i, modes[i]
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
            if(button.mode === this._player.mode) {
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