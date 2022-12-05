const MissionUtils = require("@woowacourse/mission-utils");

const InputView = {
  readMoney(callback) {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (input) => {
      callback(input);
    });
  },

  readWinningNumber(callback) {
    MissionUtils.Console.readLine("\n당첨 번호를 입력해 주세요.\n", (input) => {
      const inputsArray = input.split(",");
      const numbersArray = inputsArray.map((input) => Number(input));
      callback(numbersArray);
    });
  },

  readBonusNumber(callback) {
    MissionUtils.Console.readLine(
      "\n보너스 번호를 입력해 주세요.\n",
      (input) => {
        callback(Number(input));
      }
    );
  },
};

module.exports = InputView;
