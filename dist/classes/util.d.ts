import { ChessBoard } from "chess";
import { Chess } from "./chess";
export declare const BoardDisplay: {
    readonly Ascii: (board: ChessBoard, whiteAtBottom?: boolean, coords?: boolean) => string;
};
export declare enum FCError {
    NoChess = "No chess game found.",
    InvalidChess = "This is not a chess game."
}
export declare function generateFEN(chess: Chess): string;
export declare function getCastlingRight(chess: Chess): string | null;
export declare function getHalfclockMoves(chess: Chess): number;
export declare function getFullmoveNumber(chess: Chess): number;
export declare function possibleEnPassant(chess: Chess): string | null;
//# sourceMappingURL=util.d.ts.map