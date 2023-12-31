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
exports.getInfoShipment = exports.getStatusShipment = exports.createShipment = void 0;
const axios_1 = __importDefault(require("axios"));
const createShipment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = process.env.token;
        const ShopId = process.env.shopid;
        const response = (yield (0, axios_1.default)({
            method: 'POST',
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
            data: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Token': token,
                'ShopId': ShopId,
            }
        })).data;
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createShipment = createShipment;
const getStatusShipment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = process.env.token;
        const response = (yield (0, axios_1.default)({
            method: 'GET',
            url: `http://sandbox.goship.io/api/v2/shipments/search?code=${data}`,
            data: null,
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token,
                'Accept': "application/json",
            }
        })).data;
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getStatusShipment = getStatusShipment;
const getInfoShipment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const token = process.env.token;
    const ShopId = process.env.shopid;
    const response = (yield (0, axios_1.default)({
        method: 'GET',
        url: `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail`,
        data: data,
        headers: {
            'content-type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Token': token,
            'ShopId': ShopId,
        }
    })).data;
    return response.data;
});
exports.getInfoShipment = getInfoShipment;
