import chess, { ChessBoard, PlayedMove, Square } from "chess"
import { BoardDisplay, generateFEN } from "./util"
import { ChessManager, DeepPartial, ForgeChess } from ".."

export type AttackSquare = Record<"attackingSquare" | "kingSquare", Square>
export interface ChessEventCallback extends Record<
  "move" | "undo" | "castle" | "enPassant",
  (move: PlayedMove) => unknown | Promise<unknown>
> {
  promote: (square: Square) => unknown | Promise<unknown>
  check: (attack: AttackSquare) => unknown | Promise<unknown>
  checkmate: (attack: AttackSquare) => unknown | Promise<unknown>
}
export type ChessEvent = keyof ChessEventCallback

/** For set option function */
export enum ChessOptions {
  FlipBoard,
  ShowCoordinates,
}
export interface IChessOptions {
  display: {
    flip: boolean
    coords: boolean
  }
}
export class Chess {
  public client = chess.create({ PGN: true })
  public options: IChessOptions

  public lastPlayedMove: PlayedMove | null = null
  public constructor(
    public id: string,
    options: DeepPartial<IChessOptions> = {},
    public manager: ChessManager
  ) {
    this.options = {
      display: {
        flip: options.display?.flip ?? true,
        coords: options.display?.coords ?? true,
      },
    }
    this.addListeners(
      // @ts-ignore - someone help me
      manager.client.getExtension(ForgeChess, true).options.events?.filter((e) => !["start"].includes(e)) ?? []
    )
  }
  private addListeners(events: ChessEvent[]) {
    events.forEach((e) =>
      this.on(e, (...args: any[]) =>
        this.manager.client.getExtension(ForgeChess, true).emitter.emit(e as any, this, ...args)
      )
    )
  }

  public on<T extends ChessEvent>(event: T, callback: ChessEventCallback[T]) {
    // @ts-ignore
    this.client.on(event, callback)
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
    else if (displayType == ChessBoardDisplayType.FEN) return this.FEN
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
    this.lastPlayedMove = move
    return move
  }

  public undoMove() {
    return !this.lastPlayedMove ? false : (this.lastPlayedMove.undo(), (this.lastPlayedMove = null), true)
  }

  public get FEN() {
    return generateFEN(this)
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
      fen: this.FEN,
    }
  }
}

export enum ChessBoardDisplayType {
  Ascii = "ascii",
  FEN = "fen",
  Json = "json",
}
export function isChessInstance(v: any): v is Chess {
  return v && v instanceof Chess
}
