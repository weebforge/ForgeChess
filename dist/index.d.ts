import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { ChessManager } from "./classes";
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]> | undefined;
};
export declare class ForgeChess extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    init(client: ForgeClient): void;
}
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        chessManager?: ChessManager;
    }
}
export * from "./classes";
//# sourceMappingURL=index.d.ts.map