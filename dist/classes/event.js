"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeChessEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class ForgeChessEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client.getExtension(__1.ForgeChess, true).emitter.on(this.name, this.listener.bind(client));
    }
}
exports.ForgeChessEventHandler = ForgeChessEventHandler;
//# sourceMappingURL=event.js.map