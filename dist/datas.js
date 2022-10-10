"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = exports.reviewHates = exports.reviewLikes = exports.reviewKeywords = exports.products = void 0;
exports.products = [
    {
        id: 1,
        title: 'test product1',
    },
    {
        id: 2,
        title: 'test product2',
    },
];
exports.reviewKeywords = [
    {
        id: 1,
        title: 'test review keyword1',
    },
    {
        id: 2,
        title: 'test review keyword2',
    },
];
exports.reviewLikes = [
    {
        id: 1,
        memberId: 1,
        reviewId: 1,
    },
    {
        id: 2,
        memberId: 2,
        reviewId: 1,
    },
    {
        id: 3,
        memberId: 3,
        reviewId: 1,
    },
];
exports.reviewHates = [
    {
        id: 1,
        memberId: 1,
        reviewId: 1,
    },
    {
        id: 2,
        memberId: 2,
        reviewId: 1,
    },
    {
        id: 3,
        memberId: 3,
        reviewId: 1,
    },
];
exports.reviews = [
    {
        content: 'test review content1',
        id: 1,
        keywordIds: [1],
        productId: 1,
    },
    {
        content: 'test review content2',
        id: 2,
        keywordIds: null,
        productId: 1,
    },
];
