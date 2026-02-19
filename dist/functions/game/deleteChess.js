"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteChess",
    aliases: ["$deleteClassGame"],
    description: "Deletes the chess game from the manager.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [forgescript_1.Arg.optionalString("id", "ID of the chess game")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [id]) {
        const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (!(0, classes_1.isChessInstance)(chess))
            return this.customError(classes_1.FCError.InvalidChess);
        ctx.client.chessManager?.remove(chess.id);
        return this.success(true);
    },
});
//# sourceMappingURL=deleteChess.js.map