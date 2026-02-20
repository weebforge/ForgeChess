"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCError = exports.BoardDisplay = void 0;
exports.generateFEN = generateFEN;
exports.getCastlingRight = getCastlingRight;
exports.getHalfclockMoves = getHalfclockMoves;
exports.getFullmoveNumber = getFullmoveNumber;
exports.possibleEnPassant = possibleEnPassant;
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
                const piece = (square.piece.notation || "P")[square.piece.side.name == "black" ? "toLowerCase" : "toUpperCase"]();
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
    FCError["InvalidChess"] = "This is not a chess game.";
})(FCError || (exports.FCError = FCError = {}));
function generateFEN(chess) {
    const position = chess.client.getFen();
    const activeColor = chess.currentPlayer()[0];
    const castling = getCastlingRight(chess) || "-";
    const enPassant = possibleEnPassant(chess) || "-";
    const halfmoveClock = getHalfclockMoves(chess);
    const fullmoveNumber = getFullmoveNumber(chess);
    return `${position} ${activeColor} ${castling} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`;
}
function getCastlingRight(chess) {
    const history = chess.client.game.moveHistory ?? [];
    const board = chess.client.game.board;
    let rights = "";
    const moved = new Set();
    for (const h of history) {
        moved.add(h.prevFile + h.prevRank);
    }
    const square = (file, rank) => board.squares.find((s) => s.file === file && s.rank === rank);
    const whiteKing = square("e", 1);
    const blackKing = square("e", 8);
    if (whiteKing?.piece?.type === "king" && whiteKing.piece.side.name === "white" && !moved.has("e1")) {
        const rookH1 = square("h", 1);
        const rookA1 = square("a", 1);
        if (rookH1?.piece?.type === "rook" && rookH1.piece.side.name === "white" && !moved.has("h1"))
            rights += "K";
        if (rookA1?.piece?.type === "rook" && rookA1.piece.side.name === "white" && !moved.has("a1"))
            rights += "Q";
    }
    if (blackKing?.piece?.type === "king" && blackKing.piece.side.name === "black" && !moved.has("e8")) {
        const rookH8 = square("h", 8);
        const rookA8 = square("a", 8);
        if (rookH8?.piece?.type === "rook" && rookH8.piece.side.name === "black" && !moved.has("h8"))
            rights += "k";
        if (rookA8?.piece?.type === "rook" && rookA8.piece.side.name === "black" && !moved.has("a8"))
            rights += "q";
    }
    return rights || null;
}
function getHalfclockMoves(chess) {
    const history = chess.client.game.moveHistory ?? [];
    let count = 0;
    for (let i = history.length - 1; i >= 0; i--) {
        const move = history[i];
        const piece = move.piece;
        const isPawnMove = piece?.type === "pawn";
        const isCapture = !!move.capturedPiece;
        if (isPawnMove || isCapture) {
            break;
        }
        count++;
    }
    return count;
}
function getFullmoveNumber(chess) {
    const history = chess.client.game.moveHistory ?? [];
    return Math.floor(history.length / 2) + 1;
}
function possibleEnPassant(chess) {
    const last = chess.lastPlayedMove;
    if (!last)
        return null;
    const move = last.move;
    const piece = move.postSquare.piece;
    if (!piece || piece.type !== "pawn")
        return null;
    const fromRank = move.prevSquare.rank;
    const toRank = move.postSquare.rank;
    if (Math.abs(toRank - fromRank) !== 2)
        return null;
    const file = move.postSquare.file;
    const enPassantRank = piece.side.name === "white" ? toRank - 1 : toRank + 1;
    return `${file}${enPassantRank}`;
}
//# sourceMappingURL=util.js.map