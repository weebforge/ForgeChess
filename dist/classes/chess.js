"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessBoardDisplayType = exports.Chess = void 0;
const chess_1 = __importDefault(require("chess"));
const util_1 = require("./util");
class Chess {
    id;
    client = chess_1.default.create({ PGN: true });
    options;
    constructor(id, options = {}) {
        this.id = id;
        this.options = {
            display: {
                flip: options.display?.flip ?? true,
                coords: options.display?.coords ?? true,
            },
        };
    }
    display(displayType) {
        const board = this.client.game.board;
        if (displayType == ChessBoardDisplayType.Json)
            return board;
        else if (displayType == ChessBoardDisplayType.Ascii)
            return util_1.BoardDisplay.Ascii(board, this.options.display.flip && board.lastMovedPiece ? board.lastMovedPiece.side.name == "black" : true, this.options.display.coords);
        else if (displayType == ChessBoardDisplayType.FEN)
            return this.client.getFen();
        throw new Error("Invalid board display type.");
    }
}
exports.Chess = Chess;
var ChessBoardDisplayType;
(function (ChessBoardDisplayType) {
    ChessBoardDisplayType["Ascii"] = "ascii";
    ChessBoardDisplayType["FEN"] = "fen";
    ChessBoardDisplayType["Json"] = "json";
})(ChessBoardDisplayType || (exports.ChessBoardDisplayType = ChessBoardDisplayType = {}));
//# sourceMappingURL=chess.js.map