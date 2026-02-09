import { ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { join } from "path"
import { ChessManager } from "./classes"

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> | undefined }
export class ForgeChess extends ForgeExtension {
  public name: string = "ForgeChess"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  public init(client: ForgeClient): void {
    this.load(join(__dirname, "functions"))
  }
}

declare module "@tryforge/forgescript" {
  interface ForgeClient {
    chessManager?: ChessManager
  }
}

export * from "./classes"
