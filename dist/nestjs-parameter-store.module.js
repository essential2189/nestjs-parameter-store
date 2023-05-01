"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestjsParameterStoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsParameterStoreModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_parameter_store_constant_1 = require("./nestjs-parameter-store.constant");
const services_1 = require("./services");
const providers_1 = require("./providers");
let NestjsParameterStoreModule = NestjsParameterStoreModule_1 = class NestjsParameterStoreModule {
    static forRoot(options) {
        const configProvider = (0, providers_1.configRegisterProvider)(options);
        return {
            module: NestjsParameterStoreModule_1,
            providers: [configProvider, providers_1.ssmClientProvider, services_1.AwsParamStoreService],
            exports: [services_1.AwsParamStoreService, nestjs_parameter_store_constant_1.SSM_CLIENT],
        };
    }
    static forRootAsync(options) {
        const providers = this.asyncSsmClientProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            imports: options.imports || [],
            providers,
            exports: [services_1.AwsParamStoreService, nestjs_parameter_store_constant_1.SSM_CLIENT],
        };
    }
    static registerParamStore(options) {
        const configProvider = (0, providers_1.configRegisterProvider)(options);
        return {
            module: NestjsParameterStoreModule_1,
            providers: [configProvider, providers_1.getParametersProvider, services_1.AwsParamStoreService],
            exports: [nestjs_parameter_store_constant_1.GET_PARAMETERS],
        };
    }
    static registerParamStoreAsync(options) {
        const providers = this.asyncParamStoreProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            imports: options.imports || [],
            providers,
            exports: [nestjs_parameter_store_constant_1.GET_PARAMETERS],
        };
    }
    static asyncSsmClientProvider(options) {
        const configProvider = (0, providers_1.configSsmClientAsyncProvider)(options);
        const reqProviders = [configProvider, providers_1.ssmClientProvider, services_1.AwsParamStoreService];
        if (options.useClass) {
            return [
                ...reqProviders,
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
            ];
        }
        return reqProviders;
    }
    static asyncParamStoreProvider(options) {
        const configProvider = (0, providers_1.configParamStoreAsyncProvider)(options);
        const reqProviders = [configProvider, providers_1.getParametersProvider];
        if (options.useClass) {
            return [
                ...reqProviders,
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
            ];
        }
        return reqProviders;
    }
};
NestjsParameterStoreModule = NestjsParameterStoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], NestjsParameterStoreModule);
exports.NestjsParameterStoreModule = NestjsParameterStoreModule;
//# sourceMappingURL=nestjs-parameter-store.module.js.map