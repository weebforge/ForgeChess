"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$createChess",
    aliases: ["$chess", "$chessGame"],
    description: "Create a new chess game.",
    version: "1.0.0",
    brackets: true,
    unwrap: false,
    args: [forgescript_1.Arg.requiredString("id", "An unique game ID"), forgescript_1.Arg.restString("functions", "Functions")],
    async execute(ctx) {
        if (!this.data.fields)
            this.data.fields = [];
        const id = (await this["resolveCode"](ctx, this.data.fields[0]))?.value;
        if (!id)
            return this.customError("No ID is provided.");
        if (this.data.fields.length >= 1) {
            if (!ctx.client.chessManager || !(ctx.client.chessManager instanceof classes_1.ChessManager))
                ctx.client.chessManager = new classes_1.ChessManager();
            ctx.client.chessManager.current.push(new classes_1.Chess(id));
        }
        for (let i = 1; i < this.data.fields.length; i++) {
            await this["resolveCode"](ctx, this.data.fields[i]);
        }
        if (!ctx.client.chessManager || ctx.client.chessManager.current.length === 0)
            return this.customError("Couldnt create the chess game.");
        ctx.client.chessManager.set(ctx.client.chessManager.lastCurrent);
        ctx.client.chessManager.current = ctx.client.chessManager.current.slice(0, ctx.client.chessManager.current.length - 1);
        return this.success();
    },
});
//# sourceMappingURL=createChess.js.map