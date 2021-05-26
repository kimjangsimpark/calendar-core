/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { uuidv4 } from './utils';

interface InstanceFactory {
  [key: string]: {
    Root: any;
    [key: string]: any;
  };
}

const factory: InstanceFactory = {};

/**
 * 캘린더 인스턴스별로 유니크한 아이디에 할당
 */
export function Root<T>() {
  return (target: T) => {
    const uuid = uuidv4();
    factory[uuid] = {
      Root: target,
    };
  };
}

/**
 * 서비스 인젝션
 * @param target
 * @param key
 */
export const Autowired = () => (target: any, propertyKey: string | symbol) => {
  const InjectableConstructor = Reflect.getMetadata(
    'design:type',
    target,
    propertyKey
  );

  Object.defineProperty(target, propertyKey, {
    value: new InjectableConstructor(),
  });
};
