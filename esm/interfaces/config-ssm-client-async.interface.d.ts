import { ModuleMetadata, Type } from "@nestjs/common";
import { SSMClientConfig } from "@aws-sdk/client-ssm";
export interface ConfigSsmClientFactory {
    createOptions(): Promise<SSMClientConfig> | SSMClientConfig;
}
export interface ConfigSsmClientAsync extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<ConfigSsmClientFactory>;
    useClass?: Type<ConfigSsmClientFactory>;
    useFactory?: (...args: any[]) => Promise<SSMClientConfig> | SSMClientConfig;
    inject?: any[];
}
//# sourceMappingURL=config-ssm-client-async.interface.d.ts.map