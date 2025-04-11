/**
 * `...REQ` Marks a mongoose schema field as `required: true`
 */
export const REQ = { required: true };
/**
 * `...NOT_REQ` Marks a mongoose schema field as `required: false`
 */
export const NOT_REQ = { required: false };
/**
 * `...STR` Marks a mongoose schema field as of `type: String, default: (default = "")`
 */
export const STR = { type: String };
/**
 * `...NUM` Marks a mongoose schema field as of `type: Number, default: (default = 0)`
 */
export const NUM = { type: Number };
/**
 * `...MIN(x)` Sets the minimum value of a field to `min: x`
 */
export const MIN = (x: number) => ({ min: x });
/**
 * `...MAX(x)` Sets the maximum value of a field to `max: x`
 */
export const MAX = (x: number) => ({ max: x });
/**
 * `...UNIQUE` Marks a mongoose schema field as `unique: true`
 */
export const UNIQUE = { unique: true };
