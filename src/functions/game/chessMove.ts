import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError } from "../../classes"

export default new NativeFunction({
  name: "$chessMove",
  aliases: ["$playChessMove"],
  description: "Play a move in chess.",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [Arg.optionalString("id", "ID of the chess game"), Arg.restString("moves", "The moves to play")],
  async execute(ctx, [id, moves]) {
    const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent
    if (!chess) return this.customError(FCError.NoChess)
    for (const move of moves) {
      try {
        chess.makeMove(move.replace(" ", ""))
      } catch (error: any) {
        return this.customError(error)
      }
    }
    return this.success()
  },
})
