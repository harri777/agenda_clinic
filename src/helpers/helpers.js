// @flow
// -> here you can import anything you need - e.g. lodash for formatting purposes

// export const someFunction = (i: number) => (
//   i * 5
// );

// ========== STRINGIFY =========

export const stringifyData = (data: any) => JSON.stringify(data, null, 2);

export const stringifyError = (error: any) => (
  JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
);
