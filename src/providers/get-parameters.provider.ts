import { FactoryProvider } from "@nestjs/common";
import { GetParametersByPathRequest, Parameter } from "@aws-sdk/client-ssm";
import { AwsParamStoreService } from "../services";
import { CONFIG_OPTIONS, GET_PARAMETERS } from "../nestjs-parameter-store.constant";

export const getParametersProvider: FactoryProvider<Parameter[] | Record<string, unknown>> = {
  provide: GET_PARAMETERS,
  useFactory: (
    config: GetParametersByPathRequest,
    nestjsAwsSsmService: AwsParamStoreService,
  ): Promise<Parameter[] | Record<string, unknown>> => {
    return nestjsAwsSsmService.getParametersByPath(config);
  },
  inject: [CONFIG_OPTIONS, AwsParamStoreService],
};
