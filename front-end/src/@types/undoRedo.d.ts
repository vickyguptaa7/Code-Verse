export interface IUndoRedo {
  [key: string]: {
    stack: Array<{
      cursorPosition: { lineNumber: number; column: number };
      content: string;
    }>;
    pointer: number;
  };
}
