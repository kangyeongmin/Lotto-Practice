const MissionUtils = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const InputView = require("./InputView");
const OutputView = require("./OutputView");
const { VALUE } = require("./constant");

class App {
  #money;
  #lottos;
  #winningNumber;
  #bonusNumber;

  constructor() {
    this.#lottos = [];
  }

  play() {
    InputView.readMoney(this.#readMoneyCallback);
  }

  #createLottos(numberOfLotto) {
    for (let i = 0; i < numberOfLotto; i++) {
      const randomNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
        VALUE.NUMBER_OF_START,
        VALUE.NUMBER_OF_END,
        VALUE.NUMBER_OF_LOTTO
      );
      this.#lottos.push(new Lotto(randomNumbers).getNumbers());
    }
    OutputView.printLotto(this.#lottos);
  }

  #checkResult() {
    const result = [0, 0, 0, 0, 0];
    this.#lottos.forEach((lotto) => {
      const sameNumbers = this.#getSameNumbers(lotto);
      if (sameNumbers === VALUE.STANDARD_FIFTH) result[VALUE.FIFTH_INDEX]++;
      else if (sameNumbers === VALUE.STANDARD_FOURTH)
        result[VALUE.FOURTH_INDEX]++;
      else if (sameNumbers === VALUE.STANDARD_THIRD)
        this.#checkBonus(lotto)
          ? result[VALUE.SECOND_INDEX]++
          : result[VALUE.THIRD_INDEX]++;
      else if (sameNumbers === VALUE.STANDARD_FIRST)
        result[VALUE.FIRST_INDEX]++;
    });
    return result;
  }

  #getSameNumbers(numbers) {
    let sameNumbers = 0;
    numbers.forEach((number) => {
      if (this.#winningNumber.includes(number)) {
        sameNumbers++;
      }
    });
    return sameNumbers;
  }

  #checkBonus(lotto) {
    return lotto.includes(this.#bonusNumber);
  }

  #calculateYield(result) {
    let totalReward = 0;

    result.forEach((resultNumber, index) => {
      totalReward += resultNumber * VALUE.MONEY_ARRAY[index];
    });

    return (totalReward / this.#money) * VALUE.TO_PERCENT;
  }

  #readMoneyCallback = (money) => {
    const numberOfLotto = money / VALUE.MONEY_UNIT;
    this.#money = money;
    this.#createLottos(numberOfLotto);
    InputView.readWinningNumber(this.#readWinningNumberCallback);
  };

  #readWinningNumberCallback = (winningNumbers) => {
    this.#winningNumber = winningNumbers.map((input) => Number(input));
    InputView.readBonusNumber(
      this.#readBonusNumberCallback,
      this.#winningNumber
    );
  };

  #readBonusNumberCallback = (bonusNumber) => {
    this.#bonusNumber = bonusNumber;
    const result = this.#checkResult();
    const rate = this.#calculateYield(result);
    OutputView.printResult(result, rate);
  };
}

module.exports = App;
