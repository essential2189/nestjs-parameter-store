import { AwsParamStoreService } from "../services";
import { CONFIG_OPTIONS, GET_PARAMETERS } from "../nestjs-parameter-store.constant";
export const getParametersProvider = {
    provide: GET_PARAMETERS,
    useFactory: (config, nestjsAwsSsmService) => {
        return nestjsAwsSsmService.getParametersByPath(config);
    },
    inject: [CONFIG_OPTIONS, AwsParamStoreService],
};
//# sourceMappingURL=get-parameters.provider.js.map