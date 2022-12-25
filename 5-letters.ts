export class FiveLetters {
  readonly aimWord: string;
  readonly aimSymbols: string[];

  constructor(aimWord = 'слово') {
    this.aimWord = aimWord;
    this.aimSymbols = [...aimWord];
  }

  getWord() {
    return this.aimWord
  };
}