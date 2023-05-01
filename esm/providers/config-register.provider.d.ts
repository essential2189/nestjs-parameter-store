import { ValueProvider } from "@nestjs/common";
import { GetParametersByPathRequest, SSMClientConfig } from "@aws-sdk/client-ssm";
export declare const configRegisterProvider: (options: SSMClientConfig | GetParametersByPathRequest) => ValueProvider<SSMClientConfig | GetParametersByPathRequest>;
//# sourceMappingURL=config-register.provider.d.ts.map