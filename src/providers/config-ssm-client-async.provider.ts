import { Provider } from "@nestjs/common";
import { ConfigParamStoreFactory, ConfigSsmClientAsync } from "../interfaces";
import { CONFIG_OPTIONS } from "../nestjs-parameter-store.constant";

export const configSsmClientAsyncProvider = (options: ConfigSsmClientAsync): Provider => {
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
