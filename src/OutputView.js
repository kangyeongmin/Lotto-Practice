const MissionUtils = require("@woowacourse/mission-utils");
const { COMMENT } = require("./constant");

const OutputView = {
  printLotto(lottos) {
    MissionUtils.Console.print("\n" + lottos.length + "개를 구매했습니다.");

    lottos.forEach((lotto) => {
      MissionUtils.Console.print("[" + lotto.join(", ") + "]");
    });
  },

  printResult(result, rate) {
    MissionUtils.Console.print(COMMENT.WINTITLE);

    COMMENT.RESULT_ARRAY.forEach((comment, index) => {
      MissionUtils.Console.print(comment + result[index] + "개");
    });
    MissionUtils.Console.print("총 수익률은 " + rate + "%입니다.");
    MissionUtils.Console.close();
  },
};

module.exports = OutputView;
