import { DeepPartial } from "..";
import { Chess, IChessOptions } from "./chess";
export declare class ChessManager {
    map: Map<string, Chess>;
    current: Chess[];
    constructor();
    get lastCurrent(): Chess;
    get(id: string): Chess | undefined;
    remove(id: string): void;
    set(chess: Chess): void;
    set(id: string, opts?: DeepPartial<IChessOptions>): void;
    list(): Chess[];
}
//# sourceMappingURL=manager.d.ts.map