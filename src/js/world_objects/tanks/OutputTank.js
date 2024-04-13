/**
 * OutputTank - this is the tank where you put the fluids you want to 
 *      sell to you client.
 */

import Tank from "./Tank";

export default class OutputTank extends Tank {

    /**
     * constructor()
     * @description constructs the output tank
     * @param {Game} game the game the output tank is in 
     * @param {Layer} layer the layer the output tank is attached to
     * @param {Point} position the position of the output tank
     */
    constructor(layer, position) {
        super(layer, position, {width: 50, height: 50}, 5)

        this._description = [
            "Allows you to sell fluids",
            " to your client"
        ]
        this._wallColor = "grey";
        this._isOpened = false
    }



    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Output Tank";
	}






}