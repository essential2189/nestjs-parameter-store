import { ModuleMetadata, Type } from "@nestjs/common";
import { GetParametersByPathRequest } from "@aws-sdk/client-ssm";
export interface ConfigParamStoreFactory {
  createOptions(): Promise<GetParametersByPathRequest> | GetParametersByPathRequest;
}
export interface ConfigParamStoreAsync extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<ConfigParamStoreFactory>;
  useClass?: Type<ConfigParamStoreFactory>;
  useFactory?: (...args: any[]) => Promise<GetParametersByPathRequest> | GetParametersByPathRequest;
  inject?: any[];
}
