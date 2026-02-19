"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
const game_1 = require("../../properties/game");
exports.default = new forgescript_1.NativeFunction({
    name: "$chessGameData",
    aliases: ["$chessGameProperty", "$getChessGame"],
    description: "Get the data about chess game.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalString("id", "ID of the chess game"),
        forgescript_1.Arg.optionalEnum(game_1.ChessGameProperty, "property", "The property to pull"),
        forgescript_1.Arg.optionalString("sep", "The seperator to use incase of array"),
    ],
    output: [forgescript_1.ArgType.Json, forgescript_1.ArgType.Unknown],
    async execute(ctx, [id, prop, sep]) {
        const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (!(0, classes_1.isChessInstance)(chess))
            return this.customError(classes_1.FCError.InvalidChess);
        if (!prop)
            return this.successJSON(chess.toJSON());
        return this.success(game_1.ChessGameProperties[prop](chess, sep ?? ", "));
    },
});
//# sourceMappingURL=chessGameData.js.map