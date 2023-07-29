import Inventory from "./gui/Inventory";
import ValueBox from "./gui/ValueBox";
import * as d3 from "d3";

/**
 * HUD - the gui 
 */
export class HUD {
    /**
     * constructor()
     * @description constructs the HUD
     * @param {Player} player the player currently playing the game
     */
    constructor(game, player) {
        this._player = player;
        this._game = game;

        let belowLayer = game.layers[0].append("g")
        let aboveLayer = game.layers[0].append("g")

        this._inventory = new Inventory(belowLayer, player, {x: 20, y: 20 + 25}, 275, game.height - 30);

        this._credits = new ValueBox(aboveLayer, {x: 20, y: 20}, 250, 25);
        this._credits.create()
        this._credits.update()

        this._credits.styling = {
            color: "red",
            textColor: "black",
            strokeColor: "black",
            strokeWidth: 1
        }

        this._credits.label = "Coins";
        this._credits.value = 0;
    }


    /**
     * create()
     * @description creates the hud 
     */
    create() {
        this._inventory.create();
    }

    /**
     * get inventory()
     * @description gets the inventory of the hud
     * @returns the inventory of the HUD
     */
    get inventory() {
        return this._inventory;
    }

    /**
     * get credits()
     * @description gets the credits of the hud
     * @returns the credits of the HUD
     */
    get credits() {
        return this._credits;
    }

}