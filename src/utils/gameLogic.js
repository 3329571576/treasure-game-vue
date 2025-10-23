export class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索：'月光下的石像指向洞穴入口'");
            }, 1500);
        });
    }

    static exploreCave(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索，无法探索洞穴!");
                }
                const success = Math.random() > 0.3;
                if (success) {
                    resolve("成功进入神秘洞穴! 发现了一张古老的地图，指向遗忘之河");
                } else {
                    reject("洞穴入口被落石堵住了! 需要寻找其他入口");
                }
            }, 2000);
        });
    }

    static crossRiver(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.4;
                if (success) {
                    resolve("成功渡过遗忘之河! 河对岸发现了神庙的入口");
                } else {
                    reject("河水湍急，渡河失败! 需要寻找其他方法");
                }
            }, 1800);
        });
    }

    static solveRiddle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const riddles = [
                    { question: "6+7+2=", answer: "15" },
                    { question: "3*8+5=", answer: "29" },
                    { question: "20-4*3=", answer: "6" }
                ];

                const riddle = riddles[Math.floor(Math.random() * riddles.length)];
                const userAnswer = prompt(`神庙守卫出了一个谜题：${riddle.question}`);

                if (userAnswer && userAnswer.trim() === riddle.answer) {
                    resolve("谜题回答正确! 守卫允许你进入神庙");
                } else {
                    reject("谜题回答错误! 守卫拒绝让你进入");
                }
            }, 1000);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.4) {
                    reject("糟糕!遇到了神庙守卫!");
                } else if (random < 0.7) {
                    resolve("找到了一个神秘的箱子...但需要钥匙才能打开");
                } else {
                    resolve("直接找到了开启的宝箱! 宝藏就在里面!");
                }
            }, 2000);
        });
    }

    static findKey() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在神庙的角落里找到了宝箱的钥匙!");
            }, 1500);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏! 里面装满了金币和宝石!");
            }, 1000);
        });
    }
}