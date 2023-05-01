import { Inject, Injectable } from "@nestjs/common";
import { GET_PARAMETERS } from "../nestjs-parameter-store.constant";
import { Parameter } from "@aws-sdk/client-ssm";

@Injectable()
export class ParameterStoreService {
  constructor(@Inject(GET_PARAMETERS) private readonly parameters: Parameter[]) {}

  get() {
    return this.parameters;
  }
}
