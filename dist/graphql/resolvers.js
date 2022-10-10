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
        reviews: () => datas_1.reviews,
    },
    Mutation: {
        // createReview: (parent, args, context, info): ReviewCreatePayload => {
        createReview: (_, args) => {
            const { input } = args;
            console.log(input);
            const newReview = {
                id: datas_1.reviews.length + 1,
                content: input.content,
                keywordIds: input.keywordIds.map((keywordId) => Number(keywordId)),
                productId: Number(input.productId),
            };
            datas_1.reviews.push(newReview);
            console.log(datas_1.reviews);
            return {
                createdReview: newReview,
            };
        },
        deleteReview: (_, args) => {
            const { reviewId } = args;
            const foundReviewIndex = datas_1.reviews.findIndex((review) => review.id === Number(reviewId));
            if (foundReviewIndex > -1) {
                datas_1.reviews.splice(foundReviewIndex, 1);
            }
            return {
                deletedReviewId: reviewId,
            };
        },
        createReviewLike: () => { },
        deleteReviewLike: () => { },
        createReviewHate: () => { },
        deleteReviewHate: () => { },
    },
    Review: {
        product: (review) => {
            return datas_1.products.find((product) => product.id === review.productId);
        },
        keywords: (review) => {
            if (review.keywordIds) {
                return review.keywordIds.map((reviewKeywordId) => reviewKeywordLoader.load(reviewKeywordId));
                // return review.keywordIds.map(reviewKeywordId => reviewKeywords.find(keyword => keyword.id === reviewKeywordId))
            }
            return null;
        },
        likeCount: (review) => {
            return datas_1.reviewLikes.filter((reviewLike) => reviewLike.reviewId === review.id).length;
        },
        hateCount: (review) => {
            console.log(`hateCount: ${review}`);
            console.log(review, review.id, typeof review.id);
            return datas_1.reviewHates.filter((reviewHate) => reviewHate.reviewId === review.id).length;
        },
    },
};
const reviewKeywordLoader = new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const result = keys.map((reviewKeywordId) => datas_1.reviewKeywords.find((keyword) => keyword.id === reviewKeywordId));
    return result;
}));
