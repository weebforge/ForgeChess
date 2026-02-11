"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastMoveProperties = exports.LastMoveProperty = void 0;
const forgescript_1 = require("@tryforge/forgescript");
var LastMoveProperty;
(function (LastMoveProperty) {
    LastMoveProperty["algebraic"] = "algebraic";
    LastMoveProperty["castle"] = "castle";
    LastMoveProperty["enPassant"] = "enPassant";
    LastMoveProperty["source"] = "source";
    LastMoveProperty["destination"] = "destination";
    LastMoveProperty["piece"] = "piece";
    LastMoveProperty["player"] = "player";
    LastMoveProperty["capture"] = "capture";
    LastMoveProperty["capturedPiece"] = "capturedPiece";
})(LastMoveProperty || (exports.LastMoveProperty = LastMoveProperty = {}));
exports.LastMoveProperties = (0, forgescript_1.defineProperties)({
    algebraic: (m) => m?.move.algebraic,
    castle: (m) => m?.move.castle,
    enPassant: (m) => m?.move.enPassant,
    source: (m) => (m ? m.move.prevSquare.file + m.move.prevSquare.rank : undefined),
    destination: (m) => (m ? m.move.postSquare.file + m.move.postSquare.rank : undefined),
    piece: (m) => m?.move.postSquare.piece.type,
    player: (m) => m?.move.postSquare.piece.side.name,
    capture: (m) => !!m?.move.capturedPiece,
    capturedPiece: (m) => m?.move.capturedPiece.type,
});
//# sourceMappingURL=lastMove.js.map