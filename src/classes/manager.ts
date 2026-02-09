import { DeepPartial } from ".."
import { Chess, IChessOptions } from "./chess"

export class ChessManager {
  public map = new Map<string, Chess>()
  public current: Chess[] = []
  public constructor() {}

  public get lastCurrent() {
    return this.current[this.current.length - 1]
  }

  public get(id: string) {
    return this.map.get(id)
  }
  public remove(id: string) {
    this.map.delete(id)
  }

  set(chess: Chess): void
  set(id: string, opts?: DeepPartial<IChessOptions>): void
  public set(chessOrId: Chess | string, opts?: DeepPartial<IChessOptions>) {
    return typeof chessOrId == "string"
      ? this.map.set(chessOrId, new Chess(chessOrId, opts ?? {}))
      : this.map.set(chessOrId.id, chessOrId)
  }

  public list() {
    return Array.from(this.map.values())
  }
}
