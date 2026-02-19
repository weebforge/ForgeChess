import { Arg, NativeFunction } from "@tryforge/forgescript"
import { Chess, ChessManager } from "../../classes"
import { ForgeChess } from "../.."

export default new NativeFunction({
  name: "$createChess",
  aliases: ["$chess", "$chessGame"],
  description: "Create a new chess game.",
  version: "1.0.0",
  brackets: true,
  unwrap: false,
  args: [Arg.requiredString("id", "An unique game ID"), Arg.restString("functions", "Functions")],
  async execute(ctx) {
    if (!this.data.fields) this.data.fields = []
    const id = (await this["resolveCode"](ctx, this.data.fields[0]))?.value as string | undefined

    if (!id) return this.customError("No ID is provided.")

    if (this.data.fields.length >= 1) {
      if (!ctx.client.chessManager || !(ctx.client.chessManager instanceof ChessManager))
        ctx.client.chessManager = new ChessManager()
      ctx.client.chessManager.current.push(new Chess(id))
    }

    for (let i = 1; i < this.data.fields.length; i++) {
      await this["resolveCode"](ctx, this.data.fields[i])
    }
    if (!ctx.client.chessManager || ctx.client.chessManager.current.length === 0)
      return this.customError("Couldnt create the chess game.")

    ctx.client.getExtension(ForgeChess, true).emitter.emit("start", ctx.client.chessManager.lastCurrent)
    ctx.client.chessManager.set(ctx.client.chessManager.lastCurrent)
    ctx.client.chessManager.current = ctx.client.chessManager.current.slice(
      0,
      ctx.client.chessManager.current.length - 1
    )
    return this.success()
  },
})
