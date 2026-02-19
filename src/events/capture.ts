import { Interpreter } from "@tryforge/forgescript"
import { ForgeChess } from ".."
import { ForgeChessEventHandler } from "../classes/event"

export default new ForgeChessEventHandler({
  name: "capture",
  version: "1.0.0",
  description: "Runs when a piece is captured.",
  listener(chess, move) {
    const commands = this.getExtension(ForgeChess, true).commands.get("capture")
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: chess,
        environment: {
          move,
        },
      })
    }
  },
})
