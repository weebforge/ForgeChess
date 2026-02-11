import { Chess } from "../classes";
export declare enum ChessGameProperty {
    id = "id",
    isStalement = "isStalement",
    isCheckmate = "isCheckmate",
    isCheck = "isCheck",
    isRepetition = "isRepetition",
    fen = "fen",
    moveCount = "moveCount",
    availableMoves = "availableMoves",
    movesHistory = "movesHistory",
    player = "player",
    lastMove = "lastMove"
}
export declare const ChessGameProperties: import("@tryforge/forgescript").Properties<typeof ChessGameProperty, Chess>;
//# sourceMappingURL=game.d.ts.map