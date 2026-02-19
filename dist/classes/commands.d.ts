import { BaseCommandManager } from "@tryforge/forgescript";
import { IChessEvents } from "./event";
export declare const ChessEventManagerName = "ChessEvents";
export declare class ForgeChessCommandManager extends BaseCommandManager<keyof IChessEvents> {
    handlerName: string;
}
//# sourceMappingURL=commands.d.ts.map