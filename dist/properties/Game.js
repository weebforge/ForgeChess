"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessGameProperties = exports.ChessGameProperty = void 0;
const forgescript_1 = require("@tryforge/forgescript");
var ChessGameProperty;
(function (ChessGameProperty) {
    ChessGameProperty["id"] = "id";
    ChessGameProperty["isStalement"] = "isStalement";
    ChessGameProperty["isCheckmate"] = "isCheckmate";
    ChessGameProperty["isCheck"] = "isCheck";
    ChessGameProperty["isRepetition"] = "isRepetition";
    ChessGameProperty["fen"] = "fen";
    ChessGameProperty["moveCount"] = "moveCount";
    ChessGameProperty["availableMoves"] = "availableMoves";
    ChessGameProperty["movesHistory"] = "movesHistory";
    ChessGameProperty["player"] = "player";
    ChessGameProperty["lastMove"] = "lastMove";
})(ChessGameProperty || (exports.ChessGameProperty = ChessGameProperty = {}));
exports.ChessGameProperties = (0, forgescript_1.defineProperties)({
    id: (g) => g?.id,
    isStalement: (g) => g?.client.isStalemate,
    isCheckmate: (g) => g?.client.isCheckMate,
    isCheck: (g) => g?.client.isCheck,
    isRepetition: (g) => g?.client.isRepetition,
    fen: (g) => g?.client.getFen(),
    moveCount: (g) => g?.moveCount,
    availableMoves: (g, sep) => g?.availableMoves(true).join(sep ?? ", "),
    movesHistory: (g, sep) => g?.client.game.moveHistory.map((v) => v.algebraic).join(sep ?? ", "),
    player: (g) => g?.currentPlayer(),
    lastMove: (g) => g?.lastPlayedMove?.move.algebraic,
});
//# sourceMappingURL=game.js.map