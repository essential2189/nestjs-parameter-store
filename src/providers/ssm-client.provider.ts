import { FactoryProvider } from "@nestjs/common";
import { SSMClient } from "@aws-sdk/client-ssm";
import { CONFIG_OPTIONS, SSM_CLIENT } from "../nestjs-parameter-store.constant";

export const ssmClientProvider: FactoryProvider<SSMClient> = {
  provide: SSM_CLIENT,
  useFactory: async (config: SSMClient): Promise<SSMClient> => {
    return new SSMClient(config ?? {});
  },
  inject: [CONFIG_OPTIONS],
};
