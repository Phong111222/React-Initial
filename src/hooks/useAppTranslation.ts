// @ts-ignore
import { useTranslation } from 'react-i18next';
import resources from 'appTypes/resources';
import { TranslateStr } from 'appTypes/utils';
import { useCallback } from 'react';

type AppTranslation = typeof resources.translation;

type AppTranslationKey = keyof AppTranslation;
const useAppTranslation = () => {
  // @ts-ignore
  const { t } = useTranslation();

  const getTranslation = useCallback(
    (
      key: TranslateStr<AppTranslation, AppTranslationKey>,
      value?: Record<string, string>
    ) => {
      // @ts-ignore
      return t(key, value);
    },
    [t]
  );

  return { getTranslation };
};

export default useAppTranslation;
