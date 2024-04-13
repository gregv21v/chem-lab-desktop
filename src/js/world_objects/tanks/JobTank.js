import { getPlayer } from "../../GameState";
import Tank from "./Tank";

/**
 * JobTank
 * @description a tank used to complete a job
 */
export default class JobTank extends Tank {

    /**
     * constructor()
     * @description constructs the job tank
     * @param {String} name the name of the tank 
     * @param {Group} layer the layer to draw the tank to 
     * @param {Point} position the position of the tank
     * @param {Object[Number, Number]} interior the interior dimensions of the tank
     * @param {Number} wallWidth the width of the walls of the tank
     */
    constructor(layer, position, interior, wallWidth, jobDetails) {
        super(layer, position, interior, wallWidth);

        this._name = "Job " + jobDetails.id + " Tank";
        this._wallColor = "brown";
        this._jobDetails = jobDetails;
    }



    /**
     * update()
     * @description updates the JobTank
     */
    update() {
        super.update();

        let jobFluid = null;

        console.log("Updating...");

        // check if the job details match whats in the tank
        for (const fluidBody of this._fluidBodies) {
            if(!(fluidBody.fluid.name === "Empty" || fluidBody.fluid.name === this._jobDetails.fluid.name)) {
                
                return;
            }

            if(fluidBody.fluid.name === this._jobDetails.fluid.name) {
                jobFluid = fluidBody;
            }

        }

        // give the player credits for the fluid if it is enough
        if(jobFluid) {

            if(this._jobDetails.unitsRequired >= jobFluid.volume) {

                console.log(this._jobDetails.unitsRequired);
                this._jobDetails.unitsRequired -= jobFluid.volume;
                getPlayer().credits += jobFluid.volume * this._jobDetails.payPerUnit;


                jobFluid.volume = 0;
                this.removeVolumelessFluids();
                this.updateFluidBodies();
            } else {
                console.log("less than enough fluid");
                console.log(this._jobDetails);

                getPlayer().credits += this._jobDetails.unitsRequired * this._jobDetails.payPerUnit;

                jobFluid.volume -= this._jobDetails.unitsRequired;
                //this._jobDetails.unitsRequired = 0;
                this.updateFluidBodies();
            }
                
        }
    }
}