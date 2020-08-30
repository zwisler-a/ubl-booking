import { GlobalLogger } from './global-logging-service';
import { LoggingLevel } from './loggin-levels.enum';

export function LogMethodCall(
  config = { level: LoggingLevel.DEBUG, logReturn: false, logError: false }
): MethodDecorator {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function LoggingMethodInterceptor(...args: any[]): any {
      const getMethodIdentifier = () => {
        return `[LogMethodCall]: ${target.constructor.name}.${propertyKey}(${args}) `;
      };

      GlobalLogger.log(config.level, getMethodIdentifier(), args);
      try {
        const returnValue = originalMethod.apply(this, args);
        if (config.logReturn) {
          GlobalLogger.log(
            config.level,
            `${getMethodIdentifier()} RETURNS: ${returnValue}`,
            returnValue
          );
        }
        return returnValue;
      } catch (e) {
        if (config.logError)
          GlobalLogger.log(
            config.level,
            `${getMethodIdentifier()} ERROR: ${e}`,
            e
          );
        throw e;
      }
    };

    return descriptor;
  };
}
