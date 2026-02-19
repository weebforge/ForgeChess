"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeChessCommandManager = exports.ChessEventManagerName = void 0;
const forgescript_1 = require("@tryforge/forgescript");
exports.ChessEventManagerName = "ChessEvents";
class ForgeChessCommandManager extends forgescript_1.BaseCommandManager {
    handlerName = exports.ChessEventManagerName;
}
exports.ForgeChessCommandManager = ForgeChessCommandManager;
//# sourceMappingURL=commands.js.map