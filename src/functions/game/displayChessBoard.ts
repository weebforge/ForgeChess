import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ChessBoardDisplayType, FCError, isChessInstance } from "../../classes"

export default new NativeFunction({
  name: "$displayChessBoard",
  version: "1.0.0",
  aliases: ["$displayChess", "$chessBoard"],
  description: "Display chess board.",
  brackets: false,
  unwrap: true,
  args: [
    Arg.optionalString("id", "ID of the chess game"),
    Arg.optionalEnum(ChessBoardDisplayType, "type", "Board display type"),
  ],
  output: [ArgType.String, ArgType.Json],
  async execute(ctx, [id, type]) {
    const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras)
    if (!chess) return this.customError(FCError.NoChess)
    if (!isChessInstance(chess)) return this.customError(FCError.InvalidChess)
    if (type == ChessBoardDisplayType.Json) return this.successJSON(chess.display(type))
    return this.success(chess.display(type ?? ChessBoardDisplayType.Ascii))
  },
})
