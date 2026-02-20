import { ChessBoard } from "chess"
import { Chess } from "./chess"

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
export function generateFEN(chess: Chess): string {
  const position = chess.client.getFen()

  const activeColor = chess.currentPlayer()[0]

  const castling = getCastlingRight(chess) || "-"

  const enPassant = possibleEnPassant(chess) || "-"

  const halfmoveClock = getHalfclockMoves(chess)

  const fullmoveNumber = getFullmoveNumber(chess)

  return `${position} ${activeColor} ${castling} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`
}
export function getCastlingRight(chess: Chess): string | null {
  const history = chess.client.game.moveHistory ?? []
  const board = chess.client.game.board

  let rights = ""

  const moved = new Set<string>()

  // Track moved pieces by starting square
  for (const h of history) {
    moved.add(h.prevFile + h.prevRank)
  }

  const square = (file: string, rank: number) => board.squares.find((s) => s.file === file && s.rank === rank)

  const whiteKing = square("e", 1)
  const blackKing = square("e", 8)

  // ---------- WHITE ----------
  if (whiteKing?.piece?.type === "king" && whiteKing.piece.side.name === "white" && !moved.has("e1")) {
    const rookH1 = square("h", 1)
    const rookA1 = square("a", 1)

    if (rookH1?.piece?.type === "rook" && rookH1.piece.side.name === "white" && !moved.has("h1")) rights += "K"

    if (rookA1?.piece?.type === "rook" && rookA1.piece.side.name === "white" && !moved.has("a1")) rights += "Q"
  }

  // ---------- BLACK ----------
  if (blackKing?.piece?.type === "king" && blackKing.piece.side.name === "black" && !moved.has("e8")) {
    const rookH8 = square("h", 8)
    const rookA8 = square("a", 8)

    if (rookH8?.piece?.type === "rook" && rookH8.piece.side.name === "black" && !moved.has("h8")) rights += "k"

    if (rookA8?.piece?.type === "rook" && rookA8.piece.side.name === "black" && !moved.has("a8")) rights += "q"
  }

  return rights || null
}
export function getHalfclockMoves(chess: Chess): number {
  const history = chess.client.game.moveHistory ?? []

  let count = 0

  // Walk backwards until pawn move or capture
  for (let i = history.length - 1; i >= 0; i--) {
    const move = history[i]
    const piece = move.piece

    const isPawnMove = piece?.type === "pawn"

    const isCapture = !!move.capturedPiece
    if (isPawnMove || isCapture) {
      break
    }

    count++
  }

  return count
}
export function getFullmoveNumber(chess: Chess): number {
  const history = chess.client.game.moveHistory ?? []

  return Math.floor(history.length / 2) + 1
}
export function possibleEnPassant(chess: Chess): string | null {
  const last = chess.lastPlayedMove
  if (!last) return null

  const move = last.move
  const piece = move.postSquare.piece

  if (!piece || piece.type !== "pawn") return null

  const fromRank = move.prevSquare.rank
  const toRank = move.postSquare.rank

  // Pawn must move exactly 2 squares
  if (Math.abs(toRank - fromRank) !== 2) return null

  const file = move.postSquare.file

  // Square that was jumped over
  const enPassantRank = piece.side.name === "white" ? toRank - 1 : toRank + 1

  return `${file}${enPassantRank}`
}
