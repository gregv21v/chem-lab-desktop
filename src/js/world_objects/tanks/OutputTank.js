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
    constructor(game, layer, position) {
        super(game, layer, position, {width: 75, height: 75}, 5)

        this._description = [
            "Allows you to sell fluids",
            " to your client"
        ]
        this._wallColor = "grey";
    }



    /**
	 * get name()
	 * @returns gets the name of the pipe
	 */
	get name() {
		return "Output Tank";
	}






}