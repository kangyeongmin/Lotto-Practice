const MissionUtils = require("@woowacourse/mission-utils");
const { VALUE, REGEX } = require("../constant");
const Lotto = require("./Lotto");

class LottoMachine {
  #money;
  #lottos;
  #winningNumbers;
  #bonusNumber;
  #rankResult;
  #rate;

  constructor(money) {
    this.validateMoney(money);
    this.#money = money;
    this.#lottos = [];
    this.#rankResult = [0, 0, 0, 0, 0];
  }

  getLottos() {
    return this.#lottos;
  }

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getRankResult() {
    return this.#rankResult;
  }

  getRate() {
    return this.#rate;
  }

  setWinningNumbers(newWinningNumbers) {
    this.validateWinningNumbers(newWinningNumbers);
    this.#winningNumbers = newWinningNumbers;
  }

  setBonusNumber(newBonusNumber) {
    this.validateBonusNumber(newBonusNumber);
    this.#bonusNumber = newBonusNumber;
  }

  validateMoney(money) {
    if (!money) {
      throw new Error("[ERROR] 금액을 입력해주세요.");
    }
    if (money < VALUE.MONEY_UNIT) {
      throw new Error("[ERROR] 금액이 부족합니다.");
    }
    if (money % VALUE.MONEY_UNIT != 0) {
      throw new Error("[ERROR] 1000원 단위의 금액을 입력해 주세요.");
    }
  }

  validateWinningNumbers(winningNumber) {
    if (winningNumber.length !== VALUE.NUMBER_OF_LOTTO) {
      throw new Error("[ERROR] 당첨 번호의 개수는 6개입니다.");
    }

    const uniqueNumbers = new Set(winningNumber);
    if ([...uniqueNumbers].length !== VALUE.NUMBER_OF_LOTTO) {
      throw new Error("[ERROR] 당첨 번호는 중복될 수 없습니다.");
    }

    winningNumber.forEach((number) => {
      this.#checkLottoRange(number.toString());
    });
  }

  validateBonusNumber(bonusNumber) {
    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨번호와 중복될 수 없습니다.");
    }

    this.#checkLottoRange(bonusNumber);
  }

  createLottos() {
    for (let i = 0; i < this.#getNumberOfLotto(); i++) {
      const randomNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
        VALUE.NUMBER_OF_START,
        VALUE.NUMBER_OF_END,
        VALUE.NUMBER_OF_LOTTO
      );
      const lotto = new Lotto(randomNumbers);
      this.#lottos.push(lotto.getNumbers());
    }
  }

  sortLottos() {
    this.#lottos.forEach((lotto) => {
      lotto.sort((a, b) => a - b);
    });
  }

  checkResult() {
    this.#lottos.forEach((lotto) => {
      const sameNumbers = this.#getSameNumbers(lotto);
      if (sameNumbers === VALUE.STANDARD_FIFTH) {
        this.#rankResult[VALUE.FIFTH_INDEX]++;
      } else if (sameNumbers === VALUE.STANDARD_FOURTH) {
        this.#rankResult[VALUE.FOURTH_INDEX]++;
      } else if (sameNumbers === VALUE.STANDARD_THIRD) {
        this.#checkBonus(lotto)
          ? this.#rankResult[VALUE.SECOND_INDEX]++
          : this.#rankResult[VALUE.THIRD_INDEX]++;
      } else if (sameNumbers === VALUE.STANDARD_FIRST) {
        this.#rankResult[VALUE.FIRST_INDEX]++;
      }
    });
  }

  calculateRate() {
    let totalReward = 0;
    this.#rankResult.forEach((resultNumber, index) => {
      totalReward += resultNumber * VALUE.MONEY_ARRAY[index];
    });
    this.#rate = (totalReward / this.#money) * VALUE.TO_PERCENT;
  }

  #getNumberOfLotto() {
    return this.#money / VALUE.MONEY_UNIT;
  }

  #getSameNumbers(numbers) {
    let sameNumbers = 0;
    numbers.forEach((number) => {
      if (this.#winningNumbers.includes(number)) {
        sameNumbers++;
      }
    });
    return sameNumbers;
  }

  #checkBonus(lotto) {
    return lotto.includes(this.#bonusNumber);
  }

  #checkLottoRange(number) {
    if (!number.toString().match(REGEX.LOTTO_RANGE)) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
  }
}

module.exports = LottoMachine;
