import { Interpreter } from "@tryforge/forgescript"
import { ForgeChess } from ".."
import { ForgeChessEventHandler } from "../classes/event"

export default new ForgeChessEventHandler({
  name: "promote",
  version: "1.0.0",
  description: "Runs when a pawn is promoted.",
  listener(chess, square) {
    const commands = this.getExtension(ForgeChess, true).commands.get("promote")
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: chess,
        environment: {
          square,
        },
      })
    }
  },
})
