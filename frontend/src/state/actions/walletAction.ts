export type StackAction =
  | {
      type: "PUSH";
      n: number;
    }

export const pushToStack = (n: number): StackAction => ({
  type: "PUSH",
  n,
});
