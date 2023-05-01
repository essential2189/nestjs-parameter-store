var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestjsParameterStoreModule_1;
import { Global, Module } from "@nestjs/common";
import { GET_PARAMETERS, SSM_CLIENT } from "./nestjs-parameter-store.constant";
import { AwsParamStoreService } from "./services";
import { configParamStoreAsyncProvider, configRegisterProvider, configSsmClientAsyncProvider, getParametersProvider, ssmClientProvider, } from "./providers";
let NestjsParameterStoreModule = NestjsParameterStoreModule_1 = class NestjsParameterStoreModule {
    static forRoot(options) {
        const configProvider = configRegisterProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            providers: [configProvider, ssmClientProvider, AwsParamStoreService],
            exports: [AwsParamStoreService, SSM_CLIENT],
        };
    }
    static forRootAsync(options) {
        const providers = this.asyncSsmClientProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            imports: options.imports || [],
            providers,
            exports: [AwsParamStoreService, SSM_CLIENT],
        };
    }
    static registerParamStore(options) {
        const configProvider = configRegisterProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            providers: [configProvider, getParametersProvider, AwsParamStoreService],
            exports: [GET_PARAMETERS],
        };
    }
    static registerParamStoreAsync(options) {
        const providers = this.asyncParamStoreProvider(options);
        return {
            module: NestjsParameterStoreModule_1,
            imports: options.imports || [],
            providers,
            exports: [GET_PARAMETERS],
        };
    }
    static asyncSsmClientProvider(options) {
        const configProvider = configSsmClientAsyncProvider(options);
        const reqProviders = [configProvider, ssmClientProvider, AwsParamStoreService];
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
        const configProvider = configParamStoreAsyncProvider(options);
        const reqProviders = [configProvider, getParametersProvider];
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
    Global(),
    Module({})
], NestjsParameterStoreModule);
export { NestjsParameterStoreModule };
//# sourceMappingURL=nestjs-parameter-store.module.js.map