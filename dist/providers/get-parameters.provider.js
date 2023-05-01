"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParametersProvider = void 0;
const services_1 = require("../services");
const nestjs_parameter_store_constant_1 = require("../nestjs-parameter-store.constant");
exports.getParametersProvider = {
    provide: nestjs_parameter_store_constant_1.GET_PARAMETERS,
    useFactory: (config, nestjsAwsSsmService) => {
        return nestjsAwsSsmService.getParametersByPath(config);
    },
    inject: [nestjs_parameter_store_constant_1.CONFIG_OPTIONS, services_1.AwsParamStoreService],
};
//# sourceMappingURL=get-parameters.provider.js.map