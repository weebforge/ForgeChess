import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { ChessManager } from "./classes";
import { TypedEmitter } from "tiny-typed-emitter";
import { IChessEvents } from "./classes/event";
import { ForgeChessCommandManager } from "./classes/commands";
export interface IForgeChessOptions {
    events?: Array<keyof IChessEvents>;
}
export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]> | undefined;
};
export declare class ForgeChess extends ForgeExtension {
    readonly options: IForgeChessOptions;
    name: string;
    description: string;
    version: string;
    emitter: TypedEmitter<TransformEvents<IChessEvents>>;
    private client;
    commands: ForgeChessCommandManager;
    constructor(options: IForgeChessOptions);
    init(client: ForgeClient): void;
}
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        chessManager?: ChessManager;
    }
}
export * from "./classes";
//# sourceMappingURL=index.d.ts.map