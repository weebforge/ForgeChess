import { defineProperties } from "@tryforge/forgescript"
import { Chess } from "../classes"

export enum ChessGameProperty {
  id = "id",
  isStalement = "isStalement",
  isCheckmate = "isCheckmate",
  isCheck = "isCheck",
  isRepetition = "isRepetition",
  fen = "fen",
  moveCount = "moveCount",
  availableMoves = "availableMoves",
  movesHistory = "movesHistory",
  player = "player",
  lastMove = "lastMove",
}

export const ChessGameProperties = defineProperties<typeof ChessGameProperty, Chess>({
  id: (g) => g?.id,
  isStalement: (g) => g?.client.isStalemate,
  isCheckmate: (g) => g?.client.isCheckMate,
  isCheck: (g) => g?.client.isCheck,
  isRepetition: (g) => g?.client.isRepetition,
  fen: (g) => g?.client.getFen(),
  moveCount: (g) => g?.moveCount,
  availableMoves: (g, sep) => g?.availableMoves(true).join(sep ?? ", "),
  movesHistory: (g, sep) => g?.client.game.moveHistory.map((v) => v.algebraic).join(sep ?? ", "),
  player: (g) => g?.currentPlayer(),
  lastMove: (g) => g?.lastPlayedMove?.move.algebraic,
})
