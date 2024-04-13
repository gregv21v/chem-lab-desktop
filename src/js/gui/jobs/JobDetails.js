/**
 * JobDetails 
 * @description the details of a job that the player can accept or reject
 */
export default class JobDetails {

    static ID = 0;
    
    /**
     * constructor()
     * @description constructs the job details object
     * @param {String} clientName the name of the client
     * @param {Array[String]} description the description of the job
     * @param {Fluid} fluid the fluid required for the job
     * @param {Number} unitsRequired the number of units of the fluid required
     * @param {Number} payPerUnit the amount of credits paid per unit
     */
    constructor(clientName, description, fluid, unitsRequired, payPerUnit) {
        this._clientName = clientName;
        this._description = description;
        this._fluid = fluid;
        this._unitsRequired = unitsRequired;
        this._payPerUnit = payPerUnit;

        this._id = JobDetails.ID;
        JobDetails.ID++;
    }




    /**
     * Getters and Setters 
     */
    /**
     * get clientName() 
     * @description gets the clients name
     */
    get clientName() { 
        return this._clientName;
    }

    /**
     * get description() 
     * @description gets the description
     */
    get description() {
        return this._description;
    }


    /**
     * get fluid() 
     * @description gets the fluid
     */
    get fluid() {
        return this._fluid;
    }


    /**
     * get unitsRequired()
     * @description gets the units required
     */
    get unitsRequired() {
        return this._unitsRequired;
    }


    /**
     * set unitsRequired()
     * @description sets the units required
     */
    set unitsRequired(value) {
        this._unitsRequired = value;
    }


    /**
     * get payPerUnit() 
     * @description gets the amount paid per unit
     */
    get payPerUnit() {
        return this._payPerUnit;
    }





    /**
     * get id() 
     * @description gets the id
     */
    get id() {
        return this._id;
    }
}
