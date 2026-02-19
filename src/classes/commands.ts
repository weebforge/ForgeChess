import { BaseCommandManager } from "@tryforge/forgescript"
import { IChessEvents } from "./event"

export const ChessEventManagerName = "ChessEvents"

export class ForgeChessCommandManager extends BaseCommandManager<keyof IChessEvents> {
  handlerName = ChessEventManagerName
}
