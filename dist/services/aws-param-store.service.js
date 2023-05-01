"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsParamStoreService = void 0;
const common_1 = require("@nestjs/common");
const client_ssm_1 = require("@aws-sdk/client-ssm");
const nestjs_parameter_store_constant_1 = require("../nestjs-parameter-store.constant");
let AwsParamStoreService = class AwsParamStoreService {
    constructor(ssmClient) {
        this.ssmClient = ssmClient;
    }
    getParameter(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const getParameterCommand = new client_ssm_1.GetParameterCommand(options);
            const result = yield this.ssmClient.send(getParameterCommand);
            return result === null || result === void 0 ? void 0 : result.Parameter;
        });
    }
    getParameters(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const getParametersCommand = new client_ssm_1.GetParametersCommand(options);
            const result = yield this.ssmClient.send(getParametersCommand);
            return result === null || result === void 0 ? void 0 : result.Parameters;
        });
    }
    getParametersByPath(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = [];
            let parametersObject = {};
            let nextToken = undefined;
            const { OnlyValue } = options, option = __rest(options, ["OnlyValue"]);
            do {
                const result = yield this.ssmClient.send(new client_ssm_1.GetParametersByPathCommand(Object.assign(Object.assign({}, option), { NextToken: nextToken })));
                if (result.Parameters) {
                    if (OnlyValue) {
                        parametersObject = Object.assign(Object.assign({}, parametersObject), this.getValueObject(result.Parameters));
                    }
                    else {
                        parameters.push(...((_a = result === null || result === void 0 ? void 0 : result.Parameters) !== null && _a !== void 0 ? _a : []));
                    }
                }
                nextToken = result === null || result === void 0 ? void 0 : result.NextToken;
            } while (nextToken);
            return OnlyValue ? parametersObject : parameters;
        });
    }
    getValueObject(params) {
        return params.reduce((acc, param) => {
            var _a;
            const name = (_a = param === null || param === void 0 ? void 0 : param.Name) === null || _a === void 0 ? void 0 : _a.split("/").pop();
            if (!name) {
                return acc;
            }
            if (!Number.isNaN(Number(param.Value))) {
                acc[name] = Number(param.Value);
                return acc;
            }
            acc[name] = param.Value;
            return acc;
        }, {});
    }
};
AwsParamStoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nestjs_parameter_store_constant_1.SSM_CLIENT)),
    __metadata("design:paramtypes", [client_ssm_1.SSMClient])
], AwsParamStoreService);
exports.AwsParamStoreService = AwsParamStoreService;
//# sourceMappingURL=aws-param-store.service.js.map