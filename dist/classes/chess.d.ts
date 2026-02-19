import { ChessBoard, PlayedMove, Square } from "chess";
import { ChessManager, DeepPartial } from "..";
export type AttackSquare = Record<"attackingSquare" | "kingSquare", Square>;
export interface ChessEventCallback extends Record<"move" | "undo" | "castle" | "enPassant", (move: PlayedMove) => unknown | Promise<unknown>> {
    promote: (square: Square) => unknown | Promise<unknown>;
    check: (attack: AttackSquare) => unknown | Promise<unknown>;
    checkmate: (attack: AttackSquare) => unknown | Promise<unknown>;
}
export type ChessEvent = keyof ChessEventCallback;
export declare enum ChessOptions {
    FlipBoard = 0,
    ShowCoordinates = 1
}
export interface IChessOptions {
    display: {
        flip: boolean;
        coords: boolean;
    };
}
export declare class Chess {
    id: string;
    manager: ChessManager;
    client: import("chess").AlgebraicGameClient;
    options: IChessOptions;
    lastPlayedMove: PlayedMove | null;
    constructor(id: string, options: DeepPartial<IChessOptions> | undefined, manager: ChessManager);
    private addListeners;
    on<T extends ChessEvent>(event: T, callback: ChessEventCallback[T]): void;
    get moveCount(): number;
    currentPlayer(): "white" | "black";
    availableMoves(san?: boolean): string[];
    display(displayType: ChessBoardDisplayType.Json): ChessBoard;
    display(displayType: Exclude<ChessBoardDisplayType, ChessBoardDisplayType.Json>): string;
    makeMove(notation: string): PlayedMove;
    undoMove(): boolean;
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
export declare function isChessInstance(v: any): v is Chess;
//# sourceMappingURL=chess.d.ts.map