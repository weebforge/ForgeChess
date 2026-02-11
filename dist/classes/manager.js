"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessManager = void 0;
const chess_1 = require("./chess");
class ChessManager {
    map = new Map();
    current = [];
    constructor() { }
    get lastCurrent() {
        return this.current[this.current.length - 1];
    }
    get(id) {
        return this.map.get(id);
    }
    remove(id) {
        this.map.delete(id);
    }
    set(chessOrId, opts) {
        return typeof chessOrId == "string"
            ? this.map.set(chessOrId, new chess_1.Chess(chessOrId, opts ?? {}))
            : this.map.set(chessOrId.id, chessOrId);
    }
    list() {
        return Array.from(this.map.values());
    }
}
exports.ChessManager = ChessManager;
//# sourceMappingURL=manager.js.map