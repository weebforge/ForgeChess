import { Interpreter } from "@tryforge/forgescript"
import { ForgeChess } from ".."
import { ForgeChessEventHandler } from "../classes/event"

export default new ForgeChessEventHandler({
  name: "start",
  version: "1.0.0",
  description: "Runs when a chess game has started.",
  listener(chess) {
    const commands = this.getExtension(ForgeChess, true).commands.get("start")
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: chess,
      })
    }
  },
})
