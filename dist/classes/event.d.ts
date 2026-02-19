import { BaseEventHandler } from "@tryforge/forgescript";
import { Chess } from "./chess";
import { ForgeClient } from "@tryforge/forgescript/dist/core";
export interface IChessEvents {
    start: [Chess];
}
export declare class ForgeChessEventHandler<T extends keyof IChessEvents> extends BaseEventHandler<IChessEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=event.d.ts.map