import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ChessOptions, FCError, isChessInstance } from "../../classes"

export default new NativeFunction({
  name: "$setChessOption",
  aliases: ["$setChessGameOption", "$chessOption"],
  description: "Set the game options",
  version: "1.0.0",
  brackets: true,
  unwrap: true,
  args: [
    Arg.requiredString("id", "ID of the chess game"),
    Arg.requiredEnum(ChessOptions, "option", "The option to update."),
    Arg.requiredString("value", "The value to set."),
  ],
  output: ArgType.Json,
  async execute(ctx, [id, opt, value]) {
    const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras)
    if (!chess) return this.customError(FCError.NoChess)
    if (!isChessInstance(chess)) return this.customError(FCError.InvalidChess)

    switch (opt) {
      case ChessOptions.FlipBoard:
        chess.options.display.flip = bool(value, true)
        break
      case ChessOptions.ShowCoordinates:
        chess.options.display.coords = bool(value, true)
        break
      default:
        break
    }
    return this.successJSON(chess.options)
  },
})

function bool(value: string, def: boolean) {
  return value.toLowerCase() == "true" ? true : value.toLowerCase() == "false" ? false : def
}
