"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$currentChessPlayer",
    aliases: ["$chessPlayer", "$playerToPlay"],
    description: "Current player turn of a chess game. (black or white)",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [forgescript_1.Arg.optionalString("id", "ID of the chess game")],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [id]) {
        const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent;
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        return this.success(chess.currentPlayer());
    },
});
//# sourceMappingURL=currentPlayer.js.map