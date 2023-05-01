import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ConfigParamStoreAsync, ConfigSsmClientAsync } from "./interfaces";
import { GET_PARAMETERS, SSM_CLIENT } from "./nestjs-parameter-store.constant";
import { AwsParamStoreService } from "./services";
import {
  configParamStoreAsyncProvider,
  configRegisterProvider,
  configSsmClientAsyncProvider,
  getParametersProvider,
  ssmClientProvider,
} from "./providers";
import { GetParametersByPathRequest, SSMClientConfig } from "@aws-sdk/client-ssm";

@Global()
@Module({})
export class NestjsParameterStoreModule {
  static forRoot(options: SSMClientConfig): DynamicModule {
    const configProvider = configRegisterProvider(options);

    return {
      module: NestjsParameterStoreModule,
      providers: [configProvider, ssmClientProvider, AwsParamStoreService],
      exports: [AwsParamStoreService, SSM_CLIENT],
    };
  }

  static forRootAsync(options: ConfigSsmClientAsync): DynamicModule {
    const providers = this.asyncSsmClientProvider(options);
    return {
      module: NestjsParameterStoreModule,
      imports: options.imports || [],
      providers,
      exports: [AwsParamStoreService, SSM_CLIENT],
    };
  }

  static registerParamStore(options: GetParametersByPathRequest): DynamicModule {
    const configProvider = configRegisterProvider(options);

    return {
      module: NestjsParameterStoreModule,
      providers: [configProvider, getParametersProvider, AwsParamStoreService],
      exports: [GET_PARAMETERS],
    };
  }

  static registerParamStoreAsync(options: ConfigParamStoreAsync): DynamicModule {
    const providers = this.asyncParamStoreProvider(options);
    return {
      module: NestjsParameterStoreModule,
      imports: options.imports || [],
      providers,
      exports: [GET_PARAMETERS],
    };
  }

  private static asyncSsmClientProvider(options: ConfigSsmClientAsync): Provider[] {
    const configProvider = configSsmClientAsyncProvider(options);
    const reqProviders = [configProvider, ssmClientProvider, AwsParamStoreService];

    if (options.useClass) {
      return [
        ...reqProviders,
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }

    return reqProviders;
  }

  private static asyncParamStoreProvider(options: ConfigParamStoreAsync): Provider[] {
    const configProvider = configParamStoreAsyncProvider(options);
    const reqProviders = [configProvider, getParametersProvider];

    if (options.useClass) {
      return [
        ...reqProviders,
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }

    return reqProviders;
  }
}
