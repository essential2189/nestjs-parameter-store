import { ValueProvider } from "@nestjs/common";
import { CONFIG_OPTIONS } from "../nestjs-parameter-store.constant";
import { GetParametersByPathRequest, SSMClientConfig } from "@aws-sdk/client-ssm";

export const configRegisterProvider = (
  options: SSMClientConfig | GetParametersByPathRequest,
): ValueProvider<SSMClientConfig | GetParametersByPathRequest> => {
  return {
    provide: CONFIG_OPTIONS,
    useValue: options,
  };
};
