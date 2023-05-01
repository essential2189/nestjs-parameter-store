import { GetParametersByPathRequest } from "@aws-sdk/client-ssm";

export interface GetParamByPathRequest extends GetParametersByPathRequest {
  OnlyValue?: boolean;
}
