import { ExtractErrorType, ExtractResponseType } from "types";
import { RequestEffectOptionsType } from "effect";
import { RequestInstance } from "request";
import { ResponseErrorType, ResponseType, ResponseSuccessType } from "adapter";

export class RequestEffect<T extends RequestInstance> {
  constructor(public config: RequestEffectOptionsType<T>) {}

  getEffectKey = () => {
    return this.config.effectKey;
  };

  onTrigger = (request: T) => {
    this.config.onTrigger?.(request);
  };
  onStart = (request: T) => {
    this.config.onStart?.(request);
  };
  onSuccess = (response: ResponseSuccessType<ExtractResponseType<T>>, request: T) => {
    this.config.onSuccess?.(response, request);
  };
  onError = (response: ResponseErrorType<ExtractErrorType<T>>, request: T) => {
    this.config.onError?.(response, request);
  };
  onFinished = (response: ResponseType<ExtractResponseType<T>, ExtractErrorType<T>>, request: T) => {
    this.config.onFinished?.(response, request);
  };
}
