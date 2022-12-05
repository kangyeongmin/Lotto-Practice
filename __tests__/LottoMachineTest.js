const LottoMachine = require("../src/Model/LottoMachine");

describe("로또기계 클래스 테스트", () => {
  test("로또기계에 1000원 미만의 금액이 입력되면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine(200);
    }).toThrow("[ERROR]");
  });

  test("로또기계에 1000원 단위가 아닌 금액이 입력되면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine(1100);
    }).toThrow("[ERROR]");
  });

  test("로또기계에 금액을 입력하지 않으면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine();
    }).toThrow("[ERROR]");
  });

  test("당첨 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine(1000).setWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine(1000).setWinningNumbers([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호가 1~45 사이의 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine(1000).setWinningNumbers([1, 2, 3, 4, 5, 46]);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 당첨번호와 중복되면 예외가 발생한다.", () => {
    expect(() => {
      const lottoMachine = new LottoMachine(1000);
      lottoMachine.setWinningNumbers([1, 2, 3, 4, 5, 6]);
      lottoMachine.setBonusNumber(1);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 1~45 사이의 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      const lottoMachine = new LottoMachine(1000);
      lottoMachine.setWinningNumbers([1, 2, 3, 4, 5, 6]);
      lottoMachine.setBonusNumber(46);
    }).toThrow("[ERROR]");
  });

  test("로또 기계는 금액과 알맞은 갯수의 로또를 생성한다.", () => {
    const lottoMachine = new LottoMachine(5000);
    lottoMachine.createLottos();

    const result = lottoMachine.getLottos().length;
    expect(result).toEqual(5);
  });

  test("로또 기계는 로또번호를 오름차순으로 정렬한다.", () => {
    const lottoMachine = new LottoMachine(1000);

    lottoMachine.createLottos();
    const lotto = lottoMachine.getLottos();

    lottoMachine.sortLottos();
    const sortedLotto = lottoMachine.getLottos();

    expect(sortedLotto).toStrictEqual(lotto.sort((a, b) => a - b));
  });
});
