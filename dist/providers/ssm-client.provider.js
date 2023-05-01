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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssmClientProvider = void 0;
const client_ssm_1 = require("@aws-sdk/client-ssm");
const nestjs_parameter_store_constant_1 = require("../nestjs-parameter-store.constant");
exports.ssmClientProvider = {
    provide: nestjs_parameter_store_constant_1.SSM_CLIENT,
    useFactory: (config) => __awaiter(void 0, void 0, void 0, function* () {
        return new client_ssm_1.SSMClient(config !== null && config !== void 0 ? config : {});
    }),
    inject: [nestjs_parameter_store_constant_1.CONFIG_OPTIONS],
};
//# sourceMappingURL=ssm-client.provider.js.map