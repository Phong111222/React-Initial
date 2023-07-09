export type TranslateStr<
  O extends Record<string, any>,
  T extends keyof O
> = T extends string
  ? O[T] extends string
    ? T
    : `${T}${TranslateStr<O[T], keyof O[T]> extends string
        ? `.${TranslateStr<O[T], keyof O[T]>}`
        : never}`
  : T;
