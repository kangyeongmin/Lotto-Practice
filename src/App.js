const InputView = require("./View/InputView");
const OutputView = require("./View/OutputView");
const LottoMachine = require("./Model/LottoMachine");

class App {
  #lottoMachine;

  play() {
    InputView.readMoney(this.#readMoneyCallback);
  }

  #readMoneyCallback = (money) => {
    this.#lottoMachine = new LottoMachine(money);
    this.#lottoMachine.createLottos();
    this.#lottoMachine.sortLottos();

    OutputView.printLotto(this.#lottoMachine.getLottos());
    InputView.readWinningNumber(this.#readWinningNumberCallback);
  };

  #readWinningNumberCallback = (winningNumbers) => {
    winningNumbers.forEach((input) => Number(input));

    this.#lottoMachine.setWinningNumbers(winningNumbers);

    InputView.readBonusNumber(
      this.#readBonusNumberCallback,
      this.#lottoMachine.getWinningNumbers()
    );
  };

  #readBonusNumberCallback = (bonusNumber) => {
    this.#lottoMachine.setBonusNumber(bonusNumber);
    this.#lottoMachine.checkResult();
    this.#lottoMachine.calculateRate();

    OutputView.printResult(this.#lottoMachine);
  };
}

module.exports = App;
