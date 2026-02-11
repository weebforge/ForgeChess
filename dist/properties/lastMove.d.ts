import { PlayedMove } from "chess";
export declare enum LastMoveProperty {
    algebraic = "algebraic",
    castle = "castle",
    enPassant = "enPassant",
    source = "source",
    destination = "destination",
    piece = "piece",
    player = "player",
    capture = "capture",
    capturedPiece = "capturedPiece"
}
export declare const LastMoveProperties: import("@tryforge/forgescript").Properties<typeof LastMoveProperty, PlayedMove>;
//# sourceMappingURL=lastMove.d.ts.map