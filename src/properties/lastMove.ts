import { defineProperties } from "@tryforge/forgescript"
import { PlayedMove } from "chess"

export enum LastMoveProperty {
  algebraic = "algebraic",
  castle = "castle",
  enPassant = "enPassant",
  source = "source",
  destination = "destination",
  piece = "piece",
  player = "player",
  capture = "capture",
  capturedPiece = "capturedPiece",
}

export const LastMoveProperties = defineProperties<typeof LastMoveProperty, PlayedMove>({
  algebraic: (m) => m?.move.algebraic,
  castle: (m) => m?.move.castle,
  enPassant: (m) => m?.move.enPassant,
  source: (m) => (m ? m.move.prevSquare.file + m.move.prevSquare.rank : undefined),
  destination: (m) => (m ? m.move.postSquare.file + m.move.postSquare.rank : undefined),
  piece: (m) => m?.move.postSquare.piece.type,
  player: (m) => m?.move.postSquare.piece.side.name,
  capture: (m) => !!m?.move.capturedPiece,
  capturedPiece: (m) => m?.move.capturedPiece.type,
})
