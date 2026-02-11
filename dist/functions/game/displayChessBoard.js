"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$displayChessBoard",
    version: "1.0.0",
    aliases: ["$displayChess", "$chessBoard"],
    description: "Display chess board.",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalString("id", "ID of the chess game"),
        forgescript_1.Arg.optionalEnum(classes_1.ChessBoardDisplayType, "type", "Board display type"),
    ],
    output: [forgescript_1.ArgType.String, forgescript_1.ArgType.Json],
    async execute(ctx, [id, type]) {
        const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent;
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        if (type == classes_1.ChessBoardDisplayType.Json)
            return this.successJSON(chess.display(type));
        return this.success(chess.display(type ?? classes_1.ChessBoardDisplayType.Ascii));
    },
});
//# sourceMappingURL=displayChessBoard.js.map