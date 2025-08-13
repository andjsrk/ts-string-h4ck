import { ExcludeStringHack, IntersectLosslessly, StringHack } from './index'

type Expect<_T extends ToBe, ToBe> = void

declare namespace Hack {
	// check if `string` gets simplified
	namespace Str {
		type T = 'a' | string
		type Checks = [
			Expect<string, T>,
		]
	}
	// check if `StringHack` gets simplified
	namespace Hack {
		type Equal<A, B> = (<G>() => G extends A ? 0 : 1) extends (<G>() => G extends B ? 0 : 1) ? true : false
		
		type T = 'a' | StringHack
		type Checks = [
			Expect<string, T>,
			Expect<Equal<string, T>, false>,
			Expect<Equal<string & {}, T>, false>,
		]
	}
}
declare namespace ExcludeHack {
	namespace Basic {
		type T = ExcludeStringHack<'a' | 'b' | StringHack>
		type Checks = [
			Expect<T, 'a' | 'b'>,
			Expect<'a' | 'b', T>,
		]
	}
	namespace TemplateString {
		type T = ExcludeStringHack<'a' | `b${string}` | StringHack>
		type Checks = [
			Expect<T, 'a' | `b${string}`>,
			Expect<'a' | `b${string}`, T>,
		]
	}
	namespace WithOtherPrimitive {
		type T = ExcludeStringHack<0 | 'a' | StringHack>
		type Checks = [
			Expect<T, 0 | 'a'>,
			Expect<0 | 'a', T>,
		]
	}
}
declare namespace Intersect {
	namespace Basic {
		type T = IntersectLosslessly<'a' | 'b' | StringHack, 'b' | 'c' | StringHack>
		type Checks = [
			Expect<ExcludeStringHack<T>, 'b'>,
			Expect<StringHack, T>,
		]
	}
	namespace WithoutHack {
		type T = IntersectLosslessly<'a' | 'b', 'b' | 'c'>
		type Checks = [
			Expect<T, 'b'>,
		]
	}
}
