"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var axios_1 = require("axios");
var API_BASE_URL = 'http://localhost:3000';
exports.api = {
    getCompliance: function (carrierId) {
        return axios_1.default.get("".concat(API_BASE_URL, "/drivers/compliance?carrierId=").concat(carrierId));
    },
    globalSearch: function (query) {
        return axios_1.default.get("".concat(API_BASE_URL, "/search?q=").concat(query));
    },
    triggerAgentEmail: function (data) {
        return axios_1.default.post("".concat(API_BASE_URL, "/notifications/agent-email"), data);
    }
};
