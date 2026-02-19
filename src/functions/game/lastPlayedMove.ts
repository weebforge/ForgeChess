import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError, isChessInstance } from "../../classes"
import { LastMoveProperties, LastMoveProperty } from "../../properties/lastMove"

export default new NativeFunction({
  name: "$lastPlayedMove",
  aliases: ["$lastChessMove", "$getLastPlayedMove"],
  description: "Get the data about the last played move",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [
    Arg.optionalString("id", "ID of the chess game"),
    Arg.optionalEnum(LastMoveProperty, "property", "The property to pull"),
  ],
  output: [ArgType.Json, ArgType.Unknown],
  async execute(ctx, [id, prop]) {
    const chess = id ? ctx.client.chessManager?.get(id) : (ctx.client.chessManager?.lastCurrent ?? ctx.runtime.extras)
    if (!chess) return this.customError(FCError.NoChess)
    if (!isChessInstance(chess)) return this.customError(FCError.InvalidChess)
    if (!chess.lastPlayedMove) return this.success()
    if (!prop) return this.successJSON(chess.lastPlayedMove)
    return this.success(LastMoveProperties[prop](chess.lastPlayedMove))
  },
})
