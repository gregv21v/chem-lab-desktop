/*
  Displays instructions on how to play the game

*/
import * as d3 from "d3"
import MultiLineText from "./MultiLineText"

export default class ToolTip {
  /**
   * constructor()
   * @description constructs the tooltip
   * @param {Point} position the position of the tooltip
   * @param {String} tip the description of the tooltip
   */
  constructor(position, description) {
    this._description = description;
    this._position = position;
    this._isHidden = true;
  }

  /**
   * create()
   * @description create the svg for the tooltip
   */
  create() {
    this._layer = d3.select("[name='debug']")

    this._svg = {
      rect: this._layer.append("rect"),
      description: new MultiLineText(
        this._layer, this._description, this._position
      )
    }
    

    this._svg.description.create();
    this._svg.rect.attr("name", "TooltipRect")
  }


  /**
   * update()
   * @description updates the tooltip
   */
  update() {

    this._svg.description.lines = this._description
    if(this._isHidden) {
      this._svg.description.hide()
    } else {
      this._svg.description.show()
    }

    this._svg.rect
      .attr("x", this._position.x - 5)
      .attr("y", this._position.y - 20)
      .attr("width", (this._isHidden) ? 0 : 200)
      .attr("height", 50)
      .style("fill", "grey")
      .style("fill-opacity", 0.5)

    
  }


  /**
   * destroy()
   * @description destroys the tooltip
   */
  destroy() {
    this._svg.description.destroy();
    this._svg.rect.remove();
  }

  /**
   * show()
   * @description shows the tooltip
   */
  show() {
    this._svg.rect.attr("width", 100)
    this._svg.description.show();
    this._isHidden = false;
  }

  /**
   * hide()
   * @description hides the tooltip
   */
  hide() {
    this._svg.rect.attr("width", 0)
    this._svg.description.hide();
    this._isHidden = true;
  }


  /**
   * set description()
   * @description sets the tooltip description
   */
  set description(value) {
    this._description = value;
    this._svg.description.lines = value;
  }


  /**
   * get description() 
   * @description gets the tooltip description
   */
  get description() { 
    return this._description;
  }


  /**
   * set position()
   * @description sets the tooltip position
   */
  set position(value) {
    this._position = value;
    this._svg.description.position = value;
  } 

  /**
   * get position()
   * @description gets the tooltip position
   * @returns {Point} the tooltip position
   */
  get position() {
    return this._position;
  }
}
