import { ChessBoard } from "chess"

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"]

export const BoardDisplay = {
  Ascii(board: ChessBoard, whiteAtBottom: boolean = true, coords: boolean = true) {
    let output = ""

    const ranks = whiteAtBottom ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8]

    const files = whiteAtBottom ? FILES : [...FILES].reverse()

    for (const rank of ranks) {
      // left rank coordinates
      if (coords) output += rank + " | "

      for (const file of files) {
        const square = board.squares.find((s) => s.file === file && s.rank === rank)

        if (!square?.piece) {
          output += "  "
          continue
        }

        const piece = (square.piece.notation || "P")[
          square.piece.side.name == "black" ? "toLowerCase" : "toUpperCase"
        ]()
        output += piece + " "
      }

      output += "\n"
    }

    // bottom file coordinates
    if (coords) {
      output += "    " + "--".repeat(files.length) + "\n"
      output += "    " + files.join(" ")
    }

    return output
  },
} as const

export enum FCError {
  NoChess = "No chess game found.",
  InvalidChess = "This is not a chess game.",
}
