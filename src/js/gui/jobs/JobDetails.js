/**
 * JobDetails - the job details
 */
export default class JobDetails {
    
    /**
     * 
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
    }

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
     * get payPerUnit() 
     * @description gets the amount paid per unit
     */
    get payPerUnit() {
        return this._payPerUnit;
    }
}
