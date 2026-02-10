import { ChessBoard, PlayedMove } from "chess";
import { DeepPartial } from "..";
export interface IChessOptions {
    display: {
        flip: boolean;
        coords: boolean;
    };
}
export declare class Chess {
    id: string;
    client: import("chess").AlgebraicGameClient;
    options: IChessOptions;
    constructor(id: string, options?: DeepPartial<IChessOptions>);
    get moveCount(): number;
    currentPlayer(): "white" | "black";
    availableMoves(san?: boolean): string[];
    display(displayType: ChessBoardDisplayType.Json): ChessBoard;
    display(displayType: Exclude<ChessBoardDisplayType, ChessBoardDisplayType.Json>): string;
    makeMove(notation: string): PlayedMove;
    toJSON(): {
        id: string;
        options: IChessOptions;
        captures: import("chess").Piece[];
        moves: {
            valid: import("chess").ValidMove[];
            notated: Record<string, import("chess").NotatedMove>;
            history: import("chess").Move[];
        };
        status: import("chess").AlgebraicGameStatus;
        fen: string;
    };
}
export declare enum ChessBoardDisplayType {
    Ascii = "ascii",
    FEN = "fen",
    Json = "json"
}
//# sourceMappingURL=chess.d.ts.map