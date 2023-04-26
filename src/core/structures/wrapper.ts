import type { ServerlessDependencies, WebsocketDependencies } from '../../types/handler';
import { DispatchType, ServerlessStrategy, WebsocketStrategy } from '../platform/strategy';


export interface WebsocketWrapper {
    readonly platform: WebsocketStrategy;
    commands: string;
    /**
      * @deprecated
      * Please specify this in platform specification
      */
    defaultPrefix?: string;
    events?: string;
    containerConfig: {
        get: (...keys: (keyof WebsocketDependencies)[]) => unknown[];
    }
}
/**
  * @deprecated
  * Type alias for WebsocketWrapper
  */
export type Wrapper = WebsocketWrapper

export interface ServerlessWrapper {
    readonly platform: ServerlessStrategy
    containerConfig: {
        get: (...keys: (keyof ServerlessDependencies)[]) => unknown[];
    }

}

export type AnyWrapper = 
    | WebsocketWrapper
    | ServerlessWrapper


export function isServerless(wrapper: AnyWrapper): wrapper is ServerlessWrapper {
    return wrapper.platform.type === DispatchType.Serverless;
}
