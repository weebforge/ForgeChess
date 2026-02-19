"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const event_1 = require("../classes/event");
exports.default = new event_1.ForgeChessEventHandler({
    name: "check",
    version: "1.0.0",
    description: "Runs when the king is in check.",
    listener(chess, attack) {
        const commands = this.getExtension(__1.ForgeChess, true).commands.get("check");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: chess,
                environment: {
                    attack,
                },
            });
        }
    },
});
//# sourceMappingURL=check.js.map