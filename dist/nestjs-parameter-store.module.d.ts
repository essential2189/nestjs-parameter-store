import { DynamicModule } from "@nestjs/common";
import { ConfigParamStoreAsync, ConfigSsmClientAsync } from "./interfaces";
import { GetParametersByPathRequest, SSMClientConfig } from "@aws-sdk/client-ssm";
export declare class NestjsParameterStoreModule {
    static forRoot(options: SSMClientConfig): DynamicModule;
    static forRootAsync(options: ConfigSsmClientAsync): DynamicModule;
    static registerParamStore(options: GetParametersByPathRequest): DynamicModule;
    static registerParamStoreAsync(options: ConfigParamStoreAsync): DynamicModule;
    private static asyncSsmClientProvider;
    private static asyncParamStoreProvider;
}
//# sourceMappingURL=nestjs-parameter-store.module.d.ts.map