import Inventory from "./gui/Inventory";
import ValueBox from "./gui/ValueBox";
import JobsButton from "./gui/buttons/JobsButton";
import Modal from "./gui/modals/Modal";
import ModeSelector from "./gui/buttons/ModeSelector";
import JobBoardModal from "./gui/modals/JobBoardModal";

/**
 * HUD - the gui 
 */
export class HUD {
    /**
     * constructor()
     * @description constructs the HUD
     * @param {Player} player the player currently playing the game
     */
    constructor(game) {
        this._game = game;

        let belowLayer = game.layers[0].append("g")
        let aboveLayer = game.layers[0].append("g")
        let buttonHeight = 30;
        let inventoryWidth = game.width / 4 - 30 /* extra padding */

        this._inventory = new Inventory(
            belowLayer, {x: 20, y: 20 + 25}, 
            inventoryWidth, game.height - buttonHeight * 5
        );

       
        this._modeSelector = new ModeSelector(
            game.player, aboveLayer, 
            {x: 20, y: game.height - buttonHeight * 3},
            inventoryWidth, buttonHeight * 2
        )
        this._modeSelector.create();
        


        let modalWidth = 3 * game.width / 4
        let modalHeight = 3 * game.height / 4
        this._jobsModal = new JobBoardModal(
            game._layers[5], 
            {x: game.width / 2 - modalWidth / 2, y: game.height / 2 - modalHeight / 2},
            modalWidth,
            modalHeight
        )
        this._jobsModal.styling = {
            color: "grey"
        }
        
        // second row of buttons
        this._jobsButton = new JobsButton(
            this._jobsModal, aboveLayer, 
            {x: 20, y: game.height - 30},
            inventoryWidth, buttonHeight
        )
        this._jobsButton.create();
        

        this._credits = new ValueBox(aboveLayer, {x: 20, y: 20}, game.width / 4 - 30, 25);
        this._credits.create()
       
        this._credits.update()

        this._credits.styling = {
            color: "lightblue",
            textColor: "black",
            strokeColor: "black",
            strokeWidth: 1
        }

        this._credits.label = "Credits";
        this._credits.value = 0;
    }


    resize() {
        
    }


    /**
     * create()
     * @description creates the hud 
     */
    create() {
        this._inventory.create();
    }


    /**
     * update() 
     * @description updates the HUD
     */
    update() {
        this._credits.value = this._game.player.credits;
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