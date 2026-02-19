import { Interpreter } from "@tryforge/forgescript"
import { ForgeChess } from ".."
import { ForgeChessEventHandler } from "../classes/event"

export default new ForgeChessEventHandler({
  name: "check",
  version: "1.0.0",
  description: "Runs when the king is in check.",
  listener(chess, attack) {
    const commands = this.getExtension(ForgeChess, true).commands.get("check")
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: chess,
        environment: {
          attack,
        },
      })
    }
  },
})
