import { createInterceptor, testMiddleware } from "../server";
import { ErrorCodesType } from "../server/server.constants";
import { buildMock } from "./mocking";

export type GetOneResponseType = {
  name: string;
  age: number;
};

export const getOneRequest = testMiddleware<GetOneResponseType>()({ endpoint: "/get-one" });

export const getOneMock = buildMock(getOneRequest, { name: "Kacper", age: 321 });

export const interceptGetOne = <StatusType extends number | ErrorCodesType>(status: StatusType) =>
  createInterceptor(getOneMock, status);