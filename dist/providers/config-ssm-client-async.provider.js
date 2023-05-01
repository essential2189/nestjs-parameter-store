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
exports.configSsmClientAsyncProvider = void 0;
const nestjs_parameter_store_constant_1 = require("../nestjs-parameter-store.constant");
const configSsmClientAsyncProvider = (options) => {
    if (options.useFactory) {
        return {
            provide: nestjs_parameter_store_constant_1.CONFIG_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
    const inject = options.useExisting || options.useClass;
    return {
        provide: nestjs_parameter_store_constant_1.CONFIG_OPTIONS,
        useFactory: (optionsFactory) => __awaiter(void 0, void 0, void 0, function* () {
            return optionsFactory.createOptions();
        }),
        inject: inject ? [inject] : [],
    };
};
exports.configSsmClientAsyncProvider = configSsmClientAsyncProvider;
//# sourceMappingURL=config-ssm-client-async.provider.js.map