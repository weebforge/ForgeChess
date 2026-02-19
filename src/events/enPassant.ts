import { Interpreter } from "@tryforge/forgescript"
import { ForgeChess } from ".."
import { ForgeChessEventHandler } from "../classes/event"

export default new ForgeChessEventHandler({
  name: "enPassant",
  version: "1.0.0",
  description: "Runs when en passant is occured.",
  listener(chess, move) {
    const commands = this.getExtension(ForgeChess, true).commands.get("enPassant")
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
