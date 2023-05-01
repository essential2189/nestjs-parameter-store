import { GetParameterRequest, GetParametersRequest, Parameter, SSMClient } from "@aws-sdk/client-ssm";
import { GetParamByPathRequest } from "../interfaces";
export declare class AwsParamStoreService {
    private readonly ssmClient;
    constructor(ssmClient: SSMClient);
    getParameter(options: GetParameterRequest): Promise<Parameter | undefined>;
    getParameters(options: GetParametersRequest): Promise<Parameter[] | undefined>;
    getParametersByPath(options: GetParamByPathRequest): Promise<Parameter[] | Record<string, unknown>>;
    private getValueObject;
}
//# sourceMappingURL=aws-param-store.service.d.ts.map