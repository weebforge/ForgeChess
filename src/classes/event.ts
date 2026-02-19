import { BaseEventHandler } from "@tryforge/forgescript"
import { AttackSquare, Chess } from "./chess"
import { ForgeClient } from "@tryforge/forgescript/dist/core"
import { ForgeChess } from ".."
import { PlayedMove, Square } from "chess"

export interface IChessEvents {
  start: [Chess]
  move: [Chess, PlayedMove]
  undo: [Chess, PlayedMove]
  capture: [Chess, PlayedMove]
  enPassant: [Chess, PlayedMove]
  castle: [Chess, PlayedMove]
  promote: [Chess, Square]
  check: [Chess, AttackSquare]
  checkmate: [Chess, AttackSquare]
}
export class ForgeChessEventHandler<T extends keyof IChessEvents> extends BaseEventHandler<IChessEvents, T> {
  register(client: ForgeClient): void {
    // @ts-ignore
    client.getExtension(ForgeChess, true).emitter.on(this.name, this.listener.bind(client))
  }
}
