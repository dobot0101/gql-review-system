"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const datas_1 = require("../datas");
exports.default = {
    Query: {
        books: () => datas_1.books,
    },
    Book: {
        author: (parent) => {
            /**
             * 아래의 fetching author ~~~ 로그가 먼저 찍힌다.
             * 다음으로 아래에 정의해놓은 authorLoader의 콜백함수에서 keys를 출력해보면
             * author를 resolve 하는데 사용되는 book.authorId의 중복이 제거된 배열이 출력되는 것을 확인할 수 있다.
             * 정리하면 dataloader를 적용하면 데이터를 fetch하는데 사용할 key를 모아서 한번에 처리한다
             * (현재 코드에는 DB를 적용하지 않았는데, DB를 적용했다 가정하면 모아놓은 key들을 가지고 한번의 쿼리로 resolve할 데이터들을 가져오게 된다.)
             */
            console.log(`fetching author ${parent.id}`);
            return authorLoader.load(parent.authorId);
            // return authors.find((author) => author.id === parent.id);
        },
    },
};
const authorLoader = new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(keys);
    const result = keys.map((authorId) => datas_1.authors.find((author) => author.id === authorId));
    return result;
}));
