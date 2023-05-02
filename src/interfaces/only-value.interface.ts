import {
  GetParameterRequest,
  GetParametersByPathRequest,
  GetParametersRequest,
} from "@aws-sdk/client-ssm";

export interface GetParamRequest extends GetParameterRequest {
  OnlyValue?: boolean;
}
export interface GetParamsRequest extends GetParametersRequest {
  OnlyValue?: boolean;
}
export interface GetParamByPathRequest extends GetParametersByPathRequest {
  OnlyValue?: boolean;
}
