"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRegisterProvider = void 0;
const nestjs_parameter_store_constant_1 = require("../nestjs-parameter-store.constant");
const configRegisterProvider = (options) => {
    return {
        provide: nestjs_parameter_store_constant_1.CONFIG_OPTIONS,
        useValue: options,
    };
};
exports.configRegisterProvider = configRegisterProvider;
//# sourceMappingURL=config-register.provider.js.map