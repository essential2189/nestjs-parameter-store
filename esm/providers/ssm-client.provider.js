var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SSMClient } from "@aws-sdk/client-ssm";
import { CONFIG_OPTIONS, SSM_CLIENT } from "../nestjs-parameter-store.constant";
export const ssmClientProvider = {
    provide: SSM_CLIENT,
    useFactory: (config) => __awaiter(void 0, void 0, void 0, function* () {
        return new SSMClient(config !== null && config !== void 0 ? config : {});
    }),
    inject: [CONFIG_OPTIONS],
};
//# sourceMappingURL=ssm-client.provider.js.map