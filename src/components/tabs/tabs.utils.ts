/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import { Label, ObjWithKeys } from '../../utils/types/common';

export const getCurrentTab = (tabs: ObjWithKeys<Label>, selected: string) =>
  Object.entries(tabs).find(
    ([_, value]) => value.value.toLowerCase() === selected.toLowerCase()
  )?.[1];
