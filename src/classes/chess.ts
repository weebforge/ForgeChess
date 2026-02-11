import chess, { ChessBoard, PlayedMove } from "chess"
import { BoardDisplay } from "./util"
import { DeepPartial } from ".."

export interface IChessOptions {
  display: {
    flip: boolean
    coords: boolean
  }
}
export class Chess {
  public client = chess.create({ PGN: true })
  public options: IChessOptions

  #_undo: (() => void) | null = null
  public constructor(
    public id: string,
    options: DeepPartial<IChessOptions> = {}
  ) {
    this.options = {
      display: {
        flip: options.display?.flip ?? true,
        coords: options.display?.coords ?? true,
      },
    }
  }

  public get moveCount() {
    return this.client.game.moveHistory?.length ?? 0
  }

  public currentPlayer() {
    return this.client.game.board.lastMovedPiece
      ? this.client.game.board.lastMovedPiece.side.name == "white"
        ? "black"
        : "white"
      : "white"
  }

  public availableMoves(san = true) {
    if (san) return Object.keys(this.client.notatedMoves)
    return Object.values(this.client.notatedMoves).map((v) => v.src.file + v.src.rank + v.dest.file + v.dest.rank)
  }

  public display(displayType: ChessBoardDisplayType.Json): ChessBoard
  public display(displayType: Exclude<ChessBoardDisplayType, ChessBoardDisplayType.Json>): string
  public display(displayType: ChessBoardDisplayType) {
    const board = this.client.game.board
    if (displayType == ChessBoardDisplayType.Json) return board
    else if (displayType == ChessBoardDisplayType.Ascii)
      return BoardDisplay.Ascii(
        board,
        this.options.display.flip ? this.currentPlayer() == "white" : true,
        this.options.display.coords
      )
    else if (displayType == ChessBoardDisplayType.FEN) return this.client.getFen()
    throw new Error("Invalid board display type.")
  }

  public makeMove(notation: string): PlayedMove
  public makeMove(start: string, end?: string): PlayedMove {
    // merge start + end into coordinate input
    if (end) start += end

    let notation: string

    // =========================
    // Coordinate Move (e2e4)
    // =========================
    if (/^([a-h][1-8]){2}$/i.test(start)) {
      const from = start.slice(0, 2).toLowerCase()
      const to = start.slice(2, 4).toLowerCase()

      notation = Object.entries(this.client.notatedMoves).find(
        (m) => m[1].src.file + m[1].src.rank === from && m[1].dest.file + m[1].dest.rank === to
      )?.[0]!

      if (!notation) throw new Error(`Invalid move ${start}`)
    }

    // =========================
    // SAN Move
    // =========================
    else {
      notation = start.trim().replace(/[A-H][1-8]/, (m) => m.toLowerCase())
    }

    if (!(notation in this.client.notatedMoves)) throw new Error(`Invalid move ${notation}`)

    const move = this.client.move(notation)

    if (!move) throw new Error(`Invalid move: ${notation}`)
    this.#_undo = move.undo
    return move
  }

  public undoMove() {
    return !this.#_undo ? false : (this.#_undo(), true)
  }

  public toJSON() {
    return {
      id: this.id,
      options: this.options,
      captures: this.client.game.captureHistory ?? [],
      moves: {
        valid: this.client.validMoves,
        notated: this.client.notatedMoves,
        history: this.client.game.moveHistory ?? [],
      },
      status: this.client.getStatus(),
      fen: this.client.getFen(),
    }
  }
}

export enum ChessBoardDisplayType {
  Ascii = "ascii",
  FEN = "fen",
  Json = "json",
}
