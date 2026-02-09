import chess, { ChessBoard } from "chess"
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

  public display(displayType: ChessBoardDisplayType.Json): ChessBoard
  public display(displayType: Exclude<ChessBoardDisplayType, ChessBoardDisplayType.Json>): string
  public display(displayType: ChessBoardDisplayType) {
    const board = this.client.game.board
    if (displayType == ChessBoardDisplayType.Json) return board
    else if (displayType == ChessBoardDisplayType.Ascii)
      return BoardDisplay.Ascii(
        board,
        this.options.display.flip && board.lastMovedPiece ? board.lastMovedPiece.side.name == "black" : true,
        this.options.display.coords
      )
    else if (displayType == ChessBoardDisplayType.FEN) return this.client.getFen()
    throw new Error("Invalid board display type.")
  }
}

export enum ChessBoardDisplayType {
  Ascii = "ascii",
  FEN = "fen",
  Json = "json",
}
