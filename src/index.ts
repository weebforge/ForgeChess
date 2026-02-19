import { EventManager, ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { join } from "path"
import { ChessManager } from "./classes"
import { TypedEmitter } from "tiny-typed-emitter"
import { IChessEvents } from "./classes/event"
import { ChessEventManagerName, ForgeChessCommandManager } from "./classes/commands"

export interface IForgeChessOptions {
  events?: Array<keyof IChessEvents>
}

export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> | undefined }
export class ForgeChess extends ForgeExtension {
  public name: string = "ForgeChess"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  public emitter = new TypedEmitter<TransformEvents<IChessEvents>>()
  private client!: ForgeClient
  public commands!: ForgeChessCommandManager

  public constructor(public readonly options: IForgeChessOptions) {
    super()
  }

  public init(client: ForgeClient): void {
    this.client = client
    this.commands = new ForgeChessCommandManager(client)
    EventManager.load(ChessEventManagerName, __dirname + "/events")
    this.load(join(__dirname, "functions"))

    if (this.options.events?.length) this.client.events.load(ChessEventManagerName, this.options.events)
  }
}

declare module "@tryforge/forgescript" {
  interface ForgeClient {
    chessManager?: ChessManager
  }
}

export * from "./classes"
