import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import array from "@tryforge/forgescript/dist/functions/array"
import { FCError } from "../../classes"

export default new NativeFunction({
  name: "$chessMoveList",
  aliases: ["$availableChessMoves", "$chessMoves"],
  description: "List of playable moves.",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [
    Arg.optionalString("id", "ID of the chess game"),
    Arg.optionalString("sep", "The seperator to use"),
    Arg.optionalBoolean("san", "Standard Algebraic Notation"),
  ],
  output: array<ArgType.String>(),
  async execute(ctx, [id, sep, san]) {
    const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent
    if (!chess) return this.customError(FCError.NoChess)
    return this.success(chess.availableMoves(san ?? true).join(sep ?? ", "))
  },
})
