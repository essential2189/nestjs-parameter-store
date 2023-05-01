import { Provider } from "@nestjs/common";
import { ConfigParamStoreAsync, ConfigParamStoreFactory } from "../interfaces";
import { CONFIG_OPTIONS } from "../nestjs-parameter-store.constant";

export const configParamStoreAsyncProvider = (options: ConfigParamStoreAsync): Provider => {
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
    useFactory: async (optionsFactory: ConfigParamStoreFactory) => {
      return optionsFactory.createOptions();
    },
    inject: inject ? [inject] : [],
  };
};
