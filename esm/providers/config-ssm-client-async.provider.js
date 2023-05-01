var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CONFIG_OPTIONS } from "../nestjs-parameter-store.constant";
export const configSsmClientAsyncProvider = (options) => {
    if (options.useFactory) {
        return {
            provide: CONFIG_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
    const inject = options.useExisting || options.useClass;
    return {
        provide: CONFIG_OPTIONS,
        useFactory: (optionsFactory) => __awaiter(void 0, void 0, void 0, function* () {
            return optionsFactory.createOptions();
        }),
        inject: inject ? [inject] : [],
    };
};
//# sourceMappingURL=config-ssm-client-async.provider.js.map