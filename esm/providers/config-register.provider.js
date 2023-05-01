import { CONFIG_OPTIONS } from "../nestjs-parameter-store.constant";
export const configRegisterProvider = (options) => {
    return {
        provide: CONFIG_OPTIONS,
        useValue: options,
    };
};
//# sourceMappingURL=config-register.provider.js.map