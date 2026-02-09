import { ChessBoard } from "chess";
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
    display(displayType: ChessBoardDisplayType.Json): ChessBoard;
    display(displayType: Exclude<ChessBoardDisplayType, ChessBoardDisplayType.Json>): string;
}
export declare enum ChessBoardDisplayType {
    Ascii = "ascii",
    FEN = "fen",
    Json = "json"
}
//# sourceMappingURL=chess.d.ts.map