"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$setChessOption",
    aliases: ["$setChessGameOption", "$chessOption"],
    description: "Set the game options",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("id", "ID of the chess game"),
        forgescript_1.Arg.requiredEnum(classes_1.ChessOptions, "option", "The option to update."),
        forgescript_1.Arg.requiredString("value", "The value to set."),
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [id, opt, value]) {
        const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras);
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (!(0, classes_1.isChessInstance)(chess))
            return this.customError(classes_1.FCError.InvalidChess);
        switch (opt) {
            case classes_1.ChessOptions.FlipBoard:
                chess.options.display.flip = bool(value, true);
                break;
            case classes_1.ChessOptions.ShowCoordinates:
                chess.options.display.coords = bool(value, true);
                break;
            default:
                break;
        }
        return this.successJSON(chess.options);
    },
});
function bool(value, def) {
    return value.toLowerCase() == "true" ? true : value.toLowerCase() == "false" ? false : def;
}
//# sourceMappingURL=setChessOption.js.map