/* eslint-disable no-unused-vars */
import { ComponentType } from 'react';

export const hoc = <SP, HP>(
  hook: (props: Partial<SP>) => HP,
  Source: ComponentType<HP & SP>
) => {
  const Result = (props: SP) => (
    <Source {...(hook(props) || ({} as any))} {...props} />
  );

  Result.Original = Source;
  Result.hook = hook;

  return Result as ComponentType<Partial<HP> & Partial<SP>> & {
    Original: ComponentType<HP & SP>;
    hook: typeof hook;
  };
};
