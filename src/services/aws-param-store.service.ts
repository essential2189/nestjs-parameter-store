import { Inject, Injectable } from "@nestjs/common";
import {
  GetParameterCommand,
  GetParametersByPathCommand,
  GetParametersCommand,
  Parameter,
  SSMClient,
} from "@aws-sdk/client-ssm";
import { SSM_CLIENT } from "../nestjs-parameter-store.constant";
import { GetParamByPathRequest, GetParamRequest, GetParamsRequest } from "../interfaces";

@Injectable()
export class AwsParamStoreService {
  constructor(@Inject(SSM_CLIENT) private readonly ssmClient: SSMClient) {}

  async getParameter(options: GetParamRequest): Promise<Parameter | undefined> {
    const { OnlyValue, ...option } = options;
    const getParameterCommand = new GetParameterCommand(option);
    const result = await this.ssmClient.send(getParameterCommand);

    if (result?.Parameter?.Name && OnlyValue) {
      const name = result.Parameter.Name.split("/").pop();
      return { [name as string]: result.Parameter?.Value };
    }
    return result?.Parameter;
  }

  async getParameters(
    options: GetParamsRequest,
  ): Promise<Parameter[] | undefined | Record<string, unknown>> {
    const parameters: Parameter[] = [];
    let parametersObject = {};

    const { OnlyValue, ...option } = options;
    const getParametersCommand = new GetParametersCommand(option);
    const result = await this.ssmClient.send(getParametersCommand);

    if (result?.Parameters) {
      if (OnlyValue) {
        parametersObject = { ...parametersObject, ...this.getValueObject(result.Parameters) };
      } else {
        parameters.push(...(result?.Parameters ?? []));
      }
    }

    return OnlyValue ? parametersObject : parameters;
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
      if (result?.Parameters) {
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
