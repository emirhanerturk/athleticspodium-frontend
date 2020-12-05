import * as memoizee from 'memoizee';

export function memoize(config?: { json?: boolean, max?: number, maxAge?: number }) {
    return (target: any, key: string, descriptor: any) => {
        const oldFunction = descriptor.value;
        let options: any = {}
        if (config){
            if (config.json) options.normalizer = (args: IArguments) => JSON.stringify(args);
            if (config.max) options.max = config.max;
            if (config.maxAge) options.maxAge = config.maxAge;
        }
        const newFunction = memoizee(oldFunction, options);
        descriptor.value = function () {
            return newFunction.apply(this, arguments);
        };
    };
};