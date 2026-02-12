"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteChess",
    aliases: ["$deleteClassGame"],
    description: "Deletes the chess game from the manager.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredString("id", "ID of the chess game")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [id]) {
        if (!id)
            return this.customError("No ID is provided.");
        const chess = ctx.client.chessManager?.get(id);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        ctx.client.chessManager?.remove(chess.id);
        return this.success(true);
    },
});
//# sourceMappingURL=deleteChess.js.map