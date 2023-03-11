/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import Game from "./js/Game"
import LoadingScreenTemplate from "./templates/LoadingScreen.html"
import TestModeScreenTemplate from "./templates/TestModeScreen.html"
import CreativeModeScreenTemplate from "./templates/CreativeModeScreen.html"
import NormalModeScreenTemplate from "./templates/NormalModeScreen.html"
import * as d3 from "d3"
import "./css/style.css"

let app = d3.select("#app")
let loadingScreen = app.html(LoadingScreenTemplate);
let game = null;

/** Remove this code to put back loading screen */
app.html(TestModeScreenTemplate)
game = new Game(0);
game.render()

loadingScreen.select("[name='test']").on("click", () => {
    app.html(TestModeScreenTemplate)
    //game = new Game(0);
    //game.render()

})

loadingScreen.select("[name='creative']").on("click", () => {
    app.html(CreativeModeScreenTemplate)
    //game = new Game(1);
    //game.render()
})

loadingScreen.select("[name='normal']").on("click", () => {
    app.html(NormalModeScreenTemplate)
    //game = new Game(2);
    //game.render()
})






