"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
const lastMove_1 = require("../../properties/lastMove");
exports.default = new forgescript_1.NativeFunction({
    name: "$lastPlayedMove",
    aliases: ["$lastChessMove", "$getLastPlayedMove"],
    description: "Get the data about the last played move",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalString("id", "ID of the chess game"),
        forgescript_1.Arg.optionalEnum(lastMove_1.LastMoveProperty, "property", "The property to pull"),
    ],
    output: [forgescript_1.ArgType.Json, forgescript_1.ArgType.Unknown],
    async execute(ctx, [id, prop]) {
        const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (!(0, classes_1.isChessInstance)(chess))
            return this.customError(classes_1.FCError.InvalidChess);
        if (!chess.lastPlayedMove)
            return this.success();
        if (!prop)
            return this.successJSON(chess.lastPlayedMove);
        return this.success(lastMove_1.LastMoveProperties[prop](chess.lastPlayedMove));
    },
});
//# sourceMappingURL=lastPlayedMove.js.map