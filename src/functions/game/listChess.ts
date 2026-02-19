import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import array from "@tryforge/forgescript/dist/functions/array"
import { ChessManager } from "../../classes"

export default new NativeFunction({
  name: "$listChess",
  aliases: ["$listChessGames", "$chessGamesList"],
  description: "List all the chess game IDs.",
  version: "1.0.0",
  brackets: false,
  unwrap: true,
  args: [Arg.optionalString("sep", "The separator to use")],
  output: array<ArgType.String>(),
  async execute(ctx, [sep]) {
    if (!ctx.client.chessManager || !(ctx.client.chessManager instanceof ChessManager))
      ctx.client.chessManager = new ChessManager(ctx.client)
    return this.success(
      ctx.client.chessManager
        .list()
        .map((x) => x.id)
        .join(sep ?? ", ")
    )
  },
})
