import Fluid from "./Fluid";

/**
 * EmptyFluid - the nothing fluid
 */
export default class EmptyFluid extends Fluid {
    /**
     * constructor()
     * @description constructs the fluid
     */
    constructor() {
        super("Empty", 0, 1, {red: 255, green: 255, blue: 255, alpha: 255})
    }


    /**
     * create()
     * @description creates the fluid
     */
    create() {
        super.create();
    }
}