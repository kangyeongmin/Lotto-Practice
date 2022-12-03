const MissionUtils = require("@woowacourse/mission-utils");
const { VALUE, REGEX } = require("./constant");

const InputView = {
  readMoney(callback) {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (input) => {
      if (validateMoney(input)) callback(input);
    });
  },

  readWinningNumber(callback) {
    MissionUtils.Console.readLine("\n당첨 번호를 입력해 주세요.\n", (input) => {
      const numbersArray = input.split(",");
      if (validateWinningNumber(numbersArray)) callback(numbersArray);
    });
  },

  readBonusNumber(callback, winningNumber) {
    MissionUtils.Console.readLine(
      "\n보너스 번호를 입력해 주세요.\n",
      (input) => {
        if (validateBonusNumber(input, winningNumber)) callback(input);
      }
    );
  },
};

function validateMoney(money) {
  if (!money) {
    throw new Error("[ERROR] 금액을 입력해주세요.");
  }
  if (money < VALUE.MONEY_UNIT) {
    throw new Error("[ERROR] 금액이 부족합니다.");
  }
  if (money % VALUE.MONEY_UNIT != 0) {
    throw new Error("[ERROR] 1000원 단위의 금액을 입력해 주세요.");
  }
  return true;
}

function validateWinningNumber(winningNumber) {
  if (winningNumber.length !== VALUE.NUMBER_OF_LOTTO) {
    throw new Error("[ERROR] 당첨 번호의 개수는 6개입니다.");
  }

  const uniqueNumbers = new Set(winningNumber);
  if ([...uniqueNumbers].length !== VALUE.NUMBER_OF_LOTTO) {
    throw new Error("[ERROR] 당첨 번호는 중복될 수 없습니다.");
  }

  winningNumber.forEach((number) => {
    checkLottoRange(number.toString());
  });

  return true;
}

function validateBonusNumber(bonusNumber, winningNumber) {
  if (winningNumber.includes(Number(bonusNumber))) {
    throw new Error("[ERROR] 보너스 번호는 당첨번호와 중복될 수 없습니다.");
  }

  checkLottoRange(bonusNumber);

  return true;
}

function checkLottoRange(number) {
  if (!number.match(REGEX.LOTTO_RANGE)) {
    throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
  }
}

module.exports = InputView;
