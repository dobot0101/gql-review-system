"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datas_1 = require("./datas");
exports.default = {
    Query: {
        books: () => datas_1.books,
    },
    Book: {
        author: (parent) => {
            datas_1.authors.find((author) => author.id === parent.id);
        },
    },
};
