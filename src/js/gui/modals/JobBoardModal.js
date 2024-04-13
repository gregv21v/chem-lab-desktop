import JobBoard from "../jobs/JobBoard";
import Label from "../Label";
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

        this._title = new Label(
            this._group, 
            {
                x: this._position.x + this._width / 2 - 50, 
                y: this._position.y + 10
            },
            100,
            50
        )
        this._title.create();

        this._title.styling = {
            ...this._title.styling,
            fontSize: "20px",
            fontWeight: "bold"
        }

        this._title.text = "Job Board";


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