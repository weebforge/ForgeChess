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
    #_undo = null;
    constructor(id, options = {}) {
        this.id = id;
        this.options = {
            display: {
                flip: options.display?.flip ?? true,
                coords: options.display?.coords ?? true,
            },
        };
    }
    get moveCount() {
        return this.client.game.moveHistory?.length ?? 0;
    }
    currentPlayer() {
        return this.client.game.board.lastMovedPiece
            ? this.client.game.board.lastMovedPiece.side.name == "white"
                ? "black"
                : "white"
            : "white";
    }
    availableMoves(san = true) {
        if (san)
            return Object.keys(this.client.notatedMoves);
        return Object.values(this.client.notatedMoves).map((v) => v.src.file + v.src.rank + v.dest.file + v.dest.rank);
    }
    display(displayType) {
        const board = this.client.game.board;
        if (displayType == ChessBoardDisplayType.Json)
            return board;
        else if (displayType == ChessBoardDisplayType.Ascii)
            return util_1.BoardDisplay.Ascii(board, this.options.display.flip ? this.currentPlayer() == "white" : true, this.options.display.coords);
        else if (displayType == ChessBoardDisplayType.FEN)
            return this.client.getFen();
        throw new Error("Invalid board display type.");
    }
    makeMove(start, end) {
        if (end)
            start += end;
        let notation;
        if (/^([a-h][1-8]){2}$/i.test(start)) {
            const from = start.slice(0, 2).toLowerCase();
            const to = start.slice(2, 4).toLowerCase();
            notation = Object.entries(this.client.notatedMoves).find((m) => m[1].src.file + m[1].src.rank === from && m[1].dest.file + m[1].dest.rank === to)?.[0];
            if (!notation)
                throw new Error(`Invalid move ${start}`);
        }
        else {
            notation = start.trim().replace(/[A-H][1-8]/, (m) => m.toLowerCase());
        }
        if (!(notation in this.client.notatedMoves))
            throw new Error(`Invalid move ${notation}`);
        const move = this.client.move(notation);
        if (!move)
            throw new Error(`Invalid move: ${notation}`);
        this.#_undo = move.undo;
        return move;
    }
    undoMove() {
        return !this.#_undo ? false : (this.#_undo(), true);
    }
    toJSON() {
        return {
            id: this.id,
            options: this.options,
            captures: this.client.game.captureHistory ?? [],
            moves: {
                valid: this.client.validMoves,
                notated: this.client.notatedMoves,
                history: this.client.game.moveHistory ?? [],
            },
            status: this.client.getStatus(),
            fen: this.client.getFen(),
        };
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