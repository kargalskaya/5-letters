export class FiveLetters {
  readonly aimWord: string;
  readonly aimSymbols: Map<string, number>;
  readonly lenght: number;

  tries: number;
  insertedSymbols: TInsertedSymbol[];

  constructor(aimWord = 'слово', lenght = 5) {
    this.aimWord = aimWord;
    this.aimSymbols = new Map();
    this.lenght = lenght;
    this.insertedSymbols = [];
    this.tries = 0;
    [...aimWord].forEach((item: string) => {
      const repetition: number = this.aimSymbols.get(item) || 0
      this.aimSymbols.set(item, repetition + 1);
    })
  }

  getWord(): string {
    return this.aimWord
  };

  getAimSymbols(): string[] {
    return [...this.aimSymbols.keys()];
  };

  getInsertedSymbol(position: number): TInsertedSymbol | undefined {
    return this.insertedSymbols[position];
  }

  getInsertedSymbols(): TInsertedSymbol[] {
    return this.insertedSymbols;
  }
  getInsertedWord(): string {
    return this.insertedSymbols.map((el: TInsertedSymbol) => el.symbol).join('');
  }

  setInsertedSymbol(symbol: string): void {
    const position = this.insertedSymbols.length;
    if (this.insertedSymbols.length === this.lenght) return;

    this.insertedSymbols.push({
      symbol: symbol,
      exist: Boolean(this.aimSymbols.get(symbol)),
      onPlace: this.aimWord[position] === symbol,
    });
    return;
  }

  checkResult(): boolean {
    return this.aimWord === this.getInsertedWord();
  }

  removeSymbol(): void {
    this.insertedSymbols = this.insertedSymbols.slice(0, this.insertedSymbols.length - 1);
    return;
  }

  clearInsertedSymbols(): void {
    this.insertedSymbols = [];
    return;
  }
}