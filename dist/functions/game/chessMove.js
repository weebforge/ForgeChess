"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$chessMove",
    aliases: ["$playChessMove"],
    description: "Play a move in chess.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [forgescript_1.Arg.optionalString("id", "ID of the chess game"), forgescript_1.Arg.restString("moves", "The moves to play")],
    async execute(ctx, [id, moves]) {
        const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (!(0, classes_1.isChessInstance)(chess))
            return this.customError(classes_1.FCError.InvalidChess);
        for (const move of moves) {
            try {
                chess.makeMove(move.replace(" ", ""));
            }
            catch (error) {
                return this.customError(error);
            }
        }
        return this.success();
    },
});
//# sourceMappingURL=chessMove.js.map