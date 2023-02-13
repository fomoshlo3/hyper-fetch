

# UseQueueReturnType

<div class="api-docs__separator">

---

</div><div class="api-docs__import">

```ts
import { UseQueueReturnType } from "@hyper-fetch/react"
```

</div><div class="api-docs__section">

## Description

</div><div class="api-docs__description"><span class="api-docs__do-not-parse">



</span></div><p class="api-docs__definition">

Defined in [hooks/use-queue/use-queue.types.ts:30](https://github.com/BetterTyped/hyper-fetch/blob/3fe127e9/packages/react/src/hooks/use-queue/use-queue.types.ts#L30)

</p><div class="api-docs__section">

## Preview

</div><div class="api-docs__preview type">

```ts
type UseQueueReturnType<T> = {
  pause: () => void; 
  requests: QueueRequest<T>[]; 
  start: () => void; 
  stop: () => void; 
  stopped: boolean; 
}
```

</div><div class="api-docs__section">

## Structure

</div><div class="api-docs__returns">

```ts
{
  pause: () => void;
  requests: {
    commandDump: CommandDump<Command>;
    requestId: string;
    retries: number;
    stopped: boolean;
    timestamp: number;
    deleteRequest: () => void;
    downloading: {
      loaded: number;
      progress: number;
      sizeLeft: number;
      startTimestamp: number;
      timeLeft: number | null;
      total: number;
      };
    startRequest: () => void;
    stopRequest: () => void;
    uploading: {
      loaded: number;
      progress: number;
      sizeLeft: number;
      startTimestamp: number;
      timeLeft: number | null;
      total: number;
      };
  }[];
  start: () => void;
  stop: () => void;
  stopped: boolean;
}
```

</div>