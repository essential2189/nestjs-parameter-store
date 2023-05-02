import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { NestjsParameterStoreModule } from "../nestjs-parameter-store.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AwsParamStoreService } from "../services";
import { GetParametersByPathRequest, Parameter } from "@aws-sdk/client-ssm";
import { ParameterStoreService } from "./parameter-store.service";

/**
 * Before testing, the AWS Parameter Store must have parameters set to the "/test", "/test/wavve/parameter", "/test/wavve/secure" path.
 * And the value of these parameters should be "wavve".
 *
 * The test will be conducted based on the "aws configure" set in your local.
 **/
describe("AWS System Manager", function () {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        NestjsParameterStoreModule.forRoot({ region: "ap-northeast-2" }),
        NestjsParameterStoreModule.registerParamStoreAsync({
          useFactory: async (): Promise<GetParametersByPathRequest> => {
            return {
              Path: "/test",
              Recursive: true,
              WithDecryption: true,
            };
          },
        }),
      ],
      providers: [AwsParamStoreService, ParameterStoreService],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  it("Get Parameters use @Inject(GET_PARAMETERS)", async () => {
    const nestjsAwsSsmService = moduleRef.get<ParameterStoreService>(ParameterStoreService);
    const result = await nestjsAwsSsmService.get();

    expect(result[0].Value).toBe("wavve");
    expect(result[1].Value).toBe("wavve");
    expect(result[2].Value).toBe("wavve");
  });

  it("Get Parameter By Path from AWS Parameter Store", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const result = (await nestjsAwsSsmService.getParametersByPath({
      Path: "/test",
      Recursive: true,
      WithDecryption: true,
    })) as Parameter[];

    expect(result[0].Value).toBe("wavve");
    expect(result[1].Value).toBe("wavve");
    expect(result[2].Value).toBe("wavve");
  });

  it("Get Parameter By Path from AWS Parameter Store Only Value", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const result: any = await nestjsAwsSsmService.getParametersByPath({
      Path: "/test",
      Recursive: true,
      WithDecryption: true,
      OnlyValue: true,
    });

    expect(result["wavve"]).toBe("wavve");
    expect(result["parameter"]).toBe("wavve");
    expect(result["secure"]).toBe("wavve");
  });

  it("Get Parameter from AWS Parameter Store", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const parameter1 = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve",
    });
    const parameter2 = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve/parameter",
    });
    const parameter3 = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve/secure",
      WithDecryption: true,
    });
    expect(parameter1?.Value).toBe("wavve");
    expect(parameter2?.Value).toBe("wavve");
    expect(parameter3?.Value).toBe("wavve");
  });

  it("Get Parameter from AWS Parameter Store Only Value", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const parameter1: any = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve",
      OnlyValue: true,
    });
    const parameter2: any = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve/parameter",
      OnlyValue: true,
    });
    const parameter3: any = await nestjsAwsSsmService.getParameter({
      Name: "/test/wavve/secure",
      WithDecryption: true,
      OnlyValue: true,
    });
    console.log(parameter1);
    expect(parameter1["wavve"]).toBe("wavve");
    expect(parameter2["parameter"]).toBe("wavve");
    expect(parameter3["secure"]).toBe("wavve");
  });

  it("Get Parameters from AWS Parameter Store", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const result = (await nestjsAwsSsmService.getParameters({
      Names: ["/test/wavve", "/test/wavve/parameter", "/test/wavve/secure"],
      WithDecryption: true,
    })) as Parameter[];

    expect(result[0].Value).toBe("wavve");
    expect(result[1].Value).toBe("wavve");
    expect(result[2].Value).toBe("wavve");
  });

  it("Get Parameters from AWS Parameter Store Only Value", async () => {
    const nestjsAwsSsmService = moduleRef.get<AwsParamStoreService>(AwsParamStoreService);
    const result: any = (await nestjsAwsSsmService.getParameters({
      Names: ["/test/wavve", "/test/wavve/parameter", "/test/wavve/secure"],
      WithDecryption: true,
      OnlyValue: true,
    })) as Parameter[];

    expect(result["wavve"]).toBe("wavve");
    expect(result["parameter"]).toBe("wavve");
    expect(result["secure"]).toBe("wavve");
  });
});
