import Fluid from "./Fluid";

/**
 * PureWaterFluid - the nothing fluid
 */
export default class PureWaterFluid extends Fluid {
    /**
     * constructor()
     * @description constructs the fluid
     */
    constructor() {
        super("Pure Water", 2, 0, 50, -5, {red: 0, green: 0, blue: 255, opacity: 0.3})
    }

    /**
     * create()
     * @description creates the fluid
     */
    create() {
        super.create();
    }
}