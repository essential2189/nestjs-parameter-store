import { Parameter, SSMClient } from "@aws-sdk/client-ssm";
import { GetParamByPathRequest, GetParamRequest, GetParamsRequest } from "../interfaces";
export declare class AwsParamStoreService {
    private readonly ssmClient;
    constructor(ssmClient: SSMClient);
    getParameter(options: GetParamRequest): Promise<Parameter | undefined>;
    getParameters(options: GetParamsRequest): Promise<Parameter[] | undefined | Record<string, unknown>>;
    getParametersByPath(options: GetParamByPathRequest): Promise<Parameter[] | Record<string, unknown>>;
    private getValueObject;
}
//# sourceMappingURL=aws-param-store.service.d.ts.map