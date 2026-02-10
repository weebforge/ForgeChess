import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError } from "../../classes"

export default new NativeFunction({
  name: "$chessGameData",
  description: "Get the data about chess game.",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [Arg.optionalString("id", "ID of the chess game")],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent
    if (!chess) return this.customError(FCError.NoChess)
    return this.successJSON(chess.toJSON())
  },
})
