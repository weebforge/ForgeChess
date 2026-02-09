"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCError = exports.BoardDisplay = void 0;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
exports.BoardDisplay = {
    Ascii(board, whiteAtBottom = true, coords = true) {
        let output = "";
        const ranks = whiteAtBottom ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
        const files = whiteAtBottom ? FILES : [...FILES].reverse();
        for (const rank of ranks) {
            if (coords)
                output += rank + " | ";
            for (const file of files) {
                const square = board.squares.find((s) => s.file === file && s.rank === rank);
                if (!square?.piece) {
                    output += "  ";
                    continue;
                }
                const piece = square.piece.type[0][square.piece.side.name == "white" ? "toUpperCase" : "toLowerCase"]();
                output += piece + " ";
            }
            output += "\n";
        }
        if (coords) {
            output += "    " + "--".repeat(files.length) + "\n";
            output += "    " + files.join(" ");
        }
        return output;
    },
};
var FCError;
(function (FCError) {
    FCError["NoChess"] = "No chess game found.";
})(FCError || (exports.FCError = FCError = {}));
//# sourceMappingURL=util.js.map