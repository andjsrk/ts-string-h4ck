/**
 * Preserves suggestions while accepts any strings.
 * 
 * See also: https://github.com/microsoft/TypeScript/issues/29729
 * 
 * @example
 * ```ts
 * type FontWeight = 'lighter' | 'normal' | 'bold' | StringHack
 * 
 * //                          v caret here
 * const weight: FontWeight = '|'
 * //                          'lighter'
 * //                          'normal'
 * //                          'bold'
 * const dynamicWeight: FontWeight = 'var(--my-weight)' // ok
 * ```
 */
export type StringHack = string & NonNullable<unknown>
/**
 * Excludes {@linkcode StringHack} from the union.
 * 
 * @example
 * ```ts
 * type FontWeight = 'lighter' | 'normal' | 'bold' | StringHack
 * 
 * type LiteralFontWeight = ExcludeStringHack<FontWeight>
 * // LiteralFontWeight = 'lighter' | 'normal' | 'bold'
 * ```
 */
export type ExcludeStringHack<U> =
	U extends string
		? string extends U
			? never
			: U
		: U
type ExtractStringHack<U> =
	Exclude<U, ExcludeStringHack<U>>
/**
 * Intersects two unions without getting simplified to `string`.
 */
export type IntersectWithoutLoss<A, B> =
	// NOTE: we extract `StringHack` instead of just doing `| StringHack`
	// because although user used this type, someday the both types may not have `StringHack`
	| ExtractStringHack<A | B>
	| ExcludeStringHack<A> & ExcludeStringHack<B>
