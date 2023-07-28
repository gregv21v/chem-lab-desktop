/*
  Displays instructions on how to play the game

*/
import * as d3 from "d3"

export default class ToolTip {
  /**
   * constructor()
   * @description constructs the tooltip
   * @param {Point} position the position of the tooltip
   * @param {String} tip the description of the tooltip
   */
  constructor(position, text) {
    this._text = text
    this._position = position
  }

  /**
   * create()
   * @description create the svg for the tooltip
   */
  create() {
    this._layer = d3.select("[name='debug']")
    this._svg = {
      rect: this._layer.append("rect"),
      text: this._layer.append("text")
    }
  }


  /**
   * update()
   * @description updates the tooltip
   */
  update() {
    this._svg.text
      .attr("x", this._position.x)
      .attr("y", this._position.y)
      .text(this._text)

    this._svg.rect
      .attr("x", this._position.x)
      .attr("y", this._position.y - 20)
      .attr("width", 0)
      .attr("height", 50)
      .style("fill", "white")
      .style("fill-opacity", 0.7)
  }


  /**
   * destroy()
   * @description destroys the tooltip
   */
  destroy() {
    this._svg.text.remove();
    this._svg.rect.remove();
  }

  /**
   * show()
   * @description shows the tooltip
   */
  show() {
    this._svg.rect.attr("width", 100)
    this._svg.text.text(this._text)
  }

  /**
   * hide()
   * @description hides the tooltip
   */
  hide() {
    this._svg.rect.attr("width", 0)
    this._svg.text.text("")
  }


  /**
   * set text()
   * @description sets the tooltip text
   */
  set text(value) {
    this._text = value;
  }


  /**
   * get text() 
   * @description gets the tooltip text
   */
  get text() { 
    return this._text;
  }


  /**
   * set position()
   * @description sets the tooltip position
   */
  set position(value) {
    this._position = value;
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
