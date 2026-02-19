import { BaseEventHandler } from "@tryforge/forgescript";
import { AttackSquare, Chess } from "./chess";
import { ForgeClient } from "@tryforge/forgescript/dist/core";
import { PlayedMove, Square } from "chess";
export interface IChessEvents {
    start: [Chess];
    move: [Chess, PlayedMove];
    undo: [Chess, PlayedMove];
    capture: [Chess, PlayedMove];
    enPassant: [Chess, PlayedMove];
    castle: [Chess, PlayedMove];
    promote: [Chess, Square];
    check: [Chess, AttackSquare];
    checkmate: [Chess, AttackSquare];
}
export declare class ForgeChessEventHandler<T extends keyof IChessEvents> extends BaseEventHandler<IChessEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=event.d.ts.map