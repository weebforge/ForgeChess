import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FCError } from "../../classes"
import { ChessGameProperties, ChessGameProperty } from "../../properties/game"

export default new NativeFunction({
  name: "$chessGameData",
  aliases: ["$chessGameProperty", "$getChessGame"],
  description: "Get the data about chess game.",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [
    Arg.optionalString("id", "ID of the chess game"),
    Arg.optionalEnum(ChessGameProperty, "property", "The property to pull"),
    Arg.optionalString("sep", "The seperator to use incase of array"),
  ],
  output: [ArgType.Json, ArgType.Unknown],
  async execute(ctx, [id, prop, sep]) {
    const chess = id ? ctx.client.chessManager?.get(id) : ctx.client.chessManager?.lastCurrent
    if (!chess) return this.customError(FCError.NoChess)
    if (!prop) return this.successJSON(chess.toJSON())
    return this.success(ChessGameProperties[prop](chess, sep ?? ", "))
  },
})
