import JobBoard from "../jobs/JobBoard";
import Modal from "./Modal";

export default class JobBoardModal extends Modal {


    /**
     * @description creates a modal
     * @param {Layer} layer the svg layer that this modal is on. Should be the top
     * @param {Number} width the width of the modal
     * @param {Number} height the height of the modal 
     */
    constructor(layer, position, width, height) {
        super(layer, position, width, height);
    }


    /**
     * create() 
     * @description creates the modal
     */
    create() {
        super.create();

        this._jobBoard = new JobBoard(
            this._group, 
            {
                x: this._position.x + 20,
                y: this._position.y + 50 
            }, 
            this._width - 40,
            this._height - 40
        )

        this._jobBoard.create();
    }


}