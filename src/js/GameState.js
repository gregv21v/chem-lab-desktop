let GAME_STATE;

export const Mode = {
    Place: 0,
    Edit: 1,
    Sell: 2,
    Inspect: 3
}



export function newGameState() {
    GAME_STATE = {
        player: null,
        hud: null,
        mode: Mode.Place,
        layer: null
    };
}

/**
 * Getters and Setters
 */
export function setMode(mode) {
    GAME_STATE.mode = mode;
}


export function setPlayer(player) {
    GAME_STATE.player = player;
}


export function setHUD(hud) {
    GAME_STATE.hud = hud;
}


export function setWorld(world) {
    GAME_STATE.world = world;
}

export function setLayers(layers) {
    GAME_STATE.layers = layers;
}


export function getMode() {
    return GAME_STATE.mode;
}

export function getPlayer() {
    return GAME_STATE.player;
}


export function getHUD() {
    return GAME_STATE.hud;
}


export function getWorld() {
    return GAME_STATE.world;
}

export function getLayers() {
    return GAME_STATE.layers;
}