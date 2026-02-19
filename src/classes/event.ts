import { BaseEventHandler } from "@tryforge/forgescript"
import { Chess } from "./chess"
import { ForgeClient } from "@tryforge/forgescript/dist/core"
import { ForgeChess } from ".."

export interface IChessEvents {
  start: [Chess]
}
export class ForgeChessEventHandler<T extends keyof IChessEvents> extends BaseEventHandler<IChessEvents, T> {
  register(client: ForgeClient): void {
    // @ts-ignore
    client.getExtension(ForgeChess, true).emitter.on(this.name, this.listener.bind(client))
  }
}
