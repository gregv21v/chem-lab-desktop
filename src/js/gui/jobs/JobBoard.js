/**
 * JobBoard - the board where all jobs are shown
 */

import PureWaterFluid from "../../world_objects/fluids/PureWaterFluid";
import ScrollableContainer from "../ScrollableContainer";
import JobDetails from "./JobDetails";
import JobPost from "./JobPost";

export default class JobBoard extends ScrollableContainer {

    /**
     * cosntructor()
     * @description constructs the job post
     */
    constructor(layer, position, width, height) {
        super(layer, position, width, height);
        this._jobPosts = []; // the list of job postings
    }



    create() {
        let postHeight = 120

        // create the job posts
        this._jobPosts.push(new JobPost(
            this._layer, {
                x: this._position.x,
                y: this._position.y
            },
            this._width,
            postHeight,
            new JobDetails(
                "Jack",
                [
                    "Jack needs some pure water to water his plants because the plants",
                    "are very sensitive. Jack will give you 10 credits per unit of purified water."
                ],
                new PureWaterFluid(),
                50, 10
            )
        ))


        for (const jobPost of this._jobPosts) {
            jobPost.create();
        }
    }


    update() {
        // update the job posts

    }

}