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
import { Inject, Injectable } from "@nestjs/common";
import { GetParameterCommand, GetParametersByPathCommand, GetParametersCommand, SSMClient, } from "@aws-sdk/client-ssm";
import { SSM_CLIENT } from "../nestjs-parameter-store.constant";
let AwsParamStoreService = class AwsParamStoreService {
    constructor(ssmClient) {
        this.ssmClient = ssmClient;
    }
    getParameter(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { OnlyValue } = options, option = __rest(options, ["OnlyValue"]);
            const getParameterCommand = new GetParameterCommand(option);
            const result = yield this.ssmClient.send(getParameterCommand);
            if (((_a = result === null || result === void 0 ? void 0 : result.Parameter) === null || _a === void 0 ? void 0 : _a.Name) && OnlyValue) {
                const name = result.Parameter.Name.split("/").pop();
                return { [name]: (_b = result.Parameter) === null || _b === void 0 ? void 0 : _b.Value };
            }
            return result === null || result === void 0 ? void 0 : result.Parameter;
        });
    }
    getParameters(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = [];
            let parametersObject = {};
            const { OnlyValue } = options, option = __rest(options, ["OnlyValue"]);
            const getParametersCommand = new GetParametersCommand(option);
            const result = yield this.ssmClient.send(getParametersCommand);
            if (result === null || result === void 0 ? void 0 : result.Parameters) {
                if (OnlyValue) {
                    parametersObject = Object.assign(Object.assign({}, parametersObject), this.getValueObject(result.Parameters));
                }
                else {
                    parameters.push(...((_a = result === null || result === void 0 ? void 0 : result.Parameters) !== null && _a !== void 0 ? _a : []));
                }
            }
            return OnlyValue ? parametersObject : parameters;
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
                const result = yield this.ssmClient.send(new GetParametersByPathCommand(Object.assign(Object.assign({}, option), { NextToken: nextToken })));
                if (result === null || result === void 0 ? void 0 : result.Parameters) {
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
    Injectable(),
    __param(0, Inject(SSM_CLIENT)),
    __metadata("design:paramtypes", [SSMClient])
], AwsParamStoreService);
export { AwsParamStoreService };
//# sourceMappingURL=aws-param-store.service.js.map