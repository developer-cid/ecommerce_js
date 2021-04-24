/**
 * Async Await Handler
 * @param  {Promise} promise
 * @return {Promise<Array>}  `[err, results]`
 */
export default function asyncAwaitHandler(promise) {
  return promise.then((data) => [null, data]).catch((err) => [err, null]);
}
