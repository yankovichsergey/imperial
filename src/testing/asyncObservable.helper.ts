import {
  defer
} from 'rxjs';
export function asyncData<T>(data: T, callback?: any) {
  return defer(() => {
    if (callback) {
      callback();
    }
    return Promise.resolve(data);
  });
}
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
