import { FiveLetters } from "./5-letters";

const fiveLetters = new FiveLetters('буква');

describe('FiveLetters getters should', () => {
  test('getWord return "буква"', () => {
    expect(fiveLetters.getWord()).toBe('буква');
  });

  test('getAimSymbols return [\'б\', \'у\', \'к\', \'в\', \'а\']', () => {
    expect(fiveLetters.getAimSymbols()).toEqual(['б', 'у', 'к', 'в', 'а']);
  });

  test('getInsertedSymbol from position 0', () => {
    expect(fiveLetters.getInsertedSymbol(0)).toEqual(undefined);
  });

  test('getInsertedSymbols from position', () => {
    expect(fiveLetters.getInsertedSymbols()).toEqual([]);
  });

  test('setInsertedSymbol symbols after add "б" on first position', () => {
    fiveLetters.setInsertedSymbol('б');
    expect(fiveLetters.getInsertedSymbols()).toEqual([{
      symbol: 'б',
      exist: true,
      onPlace: true,
    }]);
  });

  test('setInsertedSymbol symbols after add "б" on second position', () => {
    fiveLetters.setInsertedSymbol('б');
    expect(fiveLetters.getInsertedSymbols()).toEqual([
      {
        symbol: 'б',
        exist: true,
        onPlace: true,
      },
      {
        symbol: 'б',
        exist: true,
        onPlace: false,
      },
    ]);
  });

  test('setInsertedSymbol symbols after add "о" on third position', () => {
    fiveLetters.setInsertedSymbol('о');
    expect(fiveLetters.getInsertedSymbols()).toEqual([
      {
        symbol: 'б',
        exist: true,
        onPlace: true,
      },
      {
        symbol: 'б',
        exist: true,
        onPlace: false,
      },
      {
        symbol: 'о',
        exist: false,
        onPlace: false,
      },
    ]);
  });

  test('setInsertedSymbol symbols after adding 6 symbols on max 5', () => {
    fiveLetters.setInsertedSymbol('о');
    fiveLetters.setInsertedSymbol('о');
    fiveLetters.setInsertedSymbol('о');
    expect(fiveLetters.getInsertedSymbols()).toEqual([
      {
        symbol: 'б',
        exist: true,
        onPlace: true,
      },
      {
        symbol: 'б',
        exist: true,
        onPlace: false,
      },
      {
        symbol: 'о',
        exist: false,
        onPlace: false,
      },
      {
        symbol: 'о',
        exist: false,
        onPlace: false,
      },
      {
        symbol: 'о',
        exist: false,
        onPlace: false,
      },
    ]);
  });

  test('checkResult returns false, "буква" !== "буооо"', () => {
    expect(fiveLetters.checkResult()).toBe(false);
  });

  test('removeSymbol remove 3 symbols', () => {
    fiveLetters.removeSymbol();
    fiveLetters.removeSymbol();
    expect(fiveLetters.getInsertedSymbols()).toEqual([
      {
        symbol: 'б',
        exist: true,
        onPlace: true,
      },
      {
        symbol: 'б',
        exist: true,
        onPlace: false,
      },
      {
        symbol: 'о',
        exist: false,
        onPlace: false,
      },
    ]);
  });

  test('clearInsertedSymbols clear', () => {
    fiveLetters.clearInsertedSymbols();
    expect(fiveLetters.getInsertedWord()).toBe('');
  });

  test('checkResult returns true, "буква" === "буква"', () => {
    fiveLetters.setInsertedSymbol('б');
    fiveLetters.setInsertedSymbol('у');
    fiveLetters.setInsertedSymbol('к');
    fiveLetters.setInsertedSymbol('в');
    fiveLetters.setInsertedSymbol('а');
    expect(fiveLetters.getInsertedWord()).toBe("буква");
    expect(fiveLetters.checkResult()).toBe(true);
  });

  test('checkResult returns false, "слово" === "буква"', () => {
    fiveLetters.clearInsertedSymbols();
    fiveLetters.setInsertedSymbol('с');
    fiveLetters.setInsertedSymbol('л');
    fiveLetters.setInsertedSymbol('о');
    fiveLetters.setInsertedSymbol('в');
    fiveLetters.setInsertedSymbol('о');
    expect(fiveLetters.getInsertedWord()).toBe("слово");
    expect(fiveLetters.checkResult()).toBe(false);
  });
});