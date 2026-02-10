"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const array_1 = __importDefault(require("@tryforge/forgescript/dist/functions/array"));
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$chessMoveList",
    aliases: ["$availableChessMoves", "$chessMoves"],
    description: "List of playable moves.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalString("id", "ID of the chess game"),
        forgescript_1.Arg.optionalString("sep", "The seperator to use"),
        forgescript_1.Arg.optionalBoolean("san", "Standard Algebraic Notation"),
    ],
    output: (0, array_1.default)(),
    async execute(ctx, [id, sep, san]) {
        const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent;
        if (!chess)
            return this.customError(classes_1.FCError.NoChess);
        return this.success(chess.availableMoves(san ?? true).join(sep ?? ", "));
    },
});
//# sourceMappingURL=chessMoveList.js.map