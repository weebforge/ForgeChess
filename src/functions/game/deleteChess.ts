import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError } from "../../classes"
export default new NativeFunction({
  name: "$deleteChess",
  aliases: ["$deleteClassGame"],
  description: "Deletes the chess game from the manager.",
  version: "1.0.0",
  brackets: true,
  unwrap: true,
  args: [Arg.requiredString("id", "ID of the chess game")],
  output: ArgType.Boolean,
  async execute(ctx, [id]) {
    if (!id) return this.customError("No ID is provided.")
    const chess = ctx.client.chessManager?.get(id)
    if (!chess) return this.customError(FCError.NoChess)
    ctx.client.chessManager?.remove(chess.id)
    return this.success(true)
  },
})
