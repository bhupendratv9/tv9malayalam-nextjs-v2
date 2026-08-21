// Empty shim for Node.js modules in browser bundle
export default {};
export const existsSync = () => false;
export const readFileSync = () => "";
export const writeFileSync = () => {};
export const mkdirSync = () => {};
export const statSync = () => ({ mtimeMs: 0 });
export const resolve = (...args) => args.join("/");
export const join = (...args) => args.join("/");
export const createHash = () => ({ update: () => ({ digest: () => "" }) });
