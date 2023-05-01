import { Inject, Injectable } from "@nestjs/common";
import {
  GetParameterCommand,
  GetParameterRequest,
  GetParametersByPathCommand,
  GetParametersCommand,
  GetParametersRequest,
  Parameter,
  SSMClient,
} from "@aws-sdk/client-ssm";
import { SSM_CLIENT } from "../nestjs-parameter-store.constant";
import { GetParamByPathRequest } from "../interfaces";

@Injectable()
export class AwsParamStoreService {
  constructor(@Inject(SSM_CLIENT) private readonly ssmClient: SSMClient) {}

  async getParameter(options: GetParameterRequest): Promise<Parameter | undefined> {
    const getParameterCommand = new GetParameterCommand(options);
    const result = await this.ssmClient.send(getParameterCommand);
    return result?.Parameter;
  }

  async getParameters(options: GetParametersRequest): Promise<Parameter[] | undefined> {
    const getParametersCommand = new GetParametersCommand(options);
    const result = await this.ssmClient.send(getParametersCommand);
    return result?.Parameters;
  }

  async getParametersByPath(
    options: GetParamByPathRequest,
  ): Promise<Parameter[] | Record<string, unknown>> {
    const parameters: Parameter[] = [];
    let parametersObject = {};

    let nextToken: string | undefined = undefined;

    const { OnlyValue, ...option } = options;

    do {
      const result: { Parameters?: Parameter[]; NextToken?: string } = await this.ssmClient.send(
        new GetParametersByPathCommand({ ...option, NextToken: nextToken }),
      );
      if (result.Parameters) {
        if (OnlyValue) {
          parametersObject = { ...parametersObject, ...this.getValueObject(result.Parameters) };
        } else {
          parameters.push(...(result?.Parameters ?? []));
        }
      }
      nextToken = result?.NextToken;
    } while (nextToken);

    return OnlyValue ? parametersObject : parameters;
  }

  private getValueObject(params: Parameter[]) {
    return params.reduce((acc: any, param: Parameter) => {
      const name = param?.Name?.split("/").pop();
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
}
