import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError, isChessInstance } from "../../classes"

export default new NativeFunction({
  name: "$currentChessPlayer",
  aliases: ["$chessPlayer", "$playerToPlay"],
  description: "Current player turn of a chess game. (black or white)",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [Arg.optionalString("id", "ID of the chess game")],
  output: ArgType.String,
  async execute(ctx, [id]) {
    const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras)
    if (!chess) return this.customError(FCError.NoChess)
    if (!isChessInstance(chess)) return this.customError(FCError.InvalidChess)
    return this.success(chess.currentPlayer())
  },
})
