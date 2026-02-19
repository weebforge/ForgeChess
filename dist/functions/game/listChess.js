"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const array_1 = __importDefault(require("@tryforge/forgescript/dist/functions/array"));
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$listChess",
    aliases: ["$listChessGames", "$chessGamesList"],
    description: "List all the chess game IDs.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [forgescript_1.Arg.optionalString("sep", "The separator to use")],
    output: (0, array_1.default)(),
    async execute(ctx, [sep]) {
        if (!ctx.client.chessManager || !(ctx.client.chessManager instanceof classes_1.ChessManager))
            ctx.client.chessManager = new classes_1.ChessManager(ctx.client);
        return this.success(ctx.client.chessManager
            .list()
            .map((x) => x.id)
            .join(sep ?? ", "));
    },
});
//# sourceMappingURL=listChess.js.map