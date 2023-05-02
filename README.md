<!-- PROJECT LOGO -->
<br />
<div align="center">
<h2>nestjs-parameter-store</h2>

  <p align="center">
    NestJS AWS Parameter Store &middot; <a href="https://badge.fury.io/js/nestjs-parameter-store"><img src="https://badge.fury.io/js/nestjs-parameter-store.svg" alt="npm version" height="18"></a>
    <br>
    Use nestjs managed <a href="https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/what-is-systems-manager.html">AWS Systems Manager</a>.
  </p>
</div>

<br>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<ol>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#configuration">Configuration</a></li>
  <li><a href="#service">Service</a></li>
  <li><a href="#license">License</a></li>
</ol>

<!-- INSTALLATION -->

## Installation

```sh
npm install nestjs-parameter-store @aws-sdk/client-ssm

pnpm install nestjs-parameter-store @aws-sdk/client-ssm
```

## Configuration

Configure the module `forRoot()` or `forRootAsync()` to access all the
AWS System Manager service in production.

Configure the module `registerParamStore()` or `registerParamStoreAsync()` to
loaded all the parameters in AWS Parameter Store in production using `@Inject(GET_PARAMETERS)`

### Static configuration

```typescript
import {Module} from "@nestjs/common";
import {NestjsParameterStoreModule} from "nestjs-parameter-store";

@Module({
    imports: [
        NestjsParameterStoreModule.forRoot({region: "region"}),
        NestjsParameterStoreModule.registerParamStore({
            Path: "/test",
            Recursive: true,
            WithDecryption: true,
        }),
    ],
})
export class AppModule {
}
```

### Async configuration

```typescript
import {Module} from "@nestjs/common";
import {NestjsParameterStoreModule} from "nestjs-parameter-store";

@Module({
    imports: [
        NestjsParameterStoreModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const {region, accessKeyId, secretAccessKey} = config.get("aws");
                return {region, accessKeyId, secretAccessKey};
            },
        }),
        NestjsParameterStoreModule.registerParamStoreAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const {path} = config.get("aws-param-store");
                return {Path: path, Recursive: true, WithDecryption: true};
            },
        }),
    ],
})
export class AppModule {
}
```

## Service

This module exposes the following services.

### AwsParamStoreService

The `AwsParamStoreService` allows you to access the configuration loaded from AWS Parameter Store. Use its own class
name as the injection token.

The `AwsParamStoreService` exposes the following methods:

- getParameter({ Name: String, WithDecryption: Boolean })
- getParameters({ Name: String[], WithDecryption: Boolean })
- getParametersByPath({ Path: String, Recursive: boolean, WithDecryption: boolean, OnlyValue: boolean })

You can use `OnlyValue` option to get the object like `{ [parameter name]: [value], ... }`.
```typescript
import {Injectable} from "@nestjs/common";
import {AwsParamStoreService} from "nestjs-parameter-store";

@Injectable()
export class TestService {
    constructor(private readonly awsParameterStore: AwsParameterStore) {
        console.log(awsParamStoreService.getParameter({Name: "/test/parameter"}));
        console.log(
            awsParamStoreService.getParameters({
                Names: ["/test/parameter", "/test/secure"],
                WithDecryption: true,
            }),
        );
        console.log(
            awsParamStoreService.getParametersByPath({
                Path: "/test",
                Recursive: true,
                WithDecryption: true,
                OnlyValue: true,
            }),
        );
    }
}
```

### GET_PARAMETERS

You can access the parameters loaded from the Parameter Store by configuration `registerParamStore()`
or `registerParamStoreAsync()`

`@Inject(GET_PARAMETERS)` is functionally the same as `getParametersByPath()`.

```typescript
import {Inject, Injectable} from "@nestjs/common";
import {GET_PARAMETERS} from "nestjs-parameter-store";
import {Parameter} from "@aws-sdk/client-ssm";

@Injectable()
export class ParameterStoreService {
    constructor(@Inject(GET_PARAMETERS) private readonly parameters: Parameter[]) {
        console.log(parameters)
    }
}
```
