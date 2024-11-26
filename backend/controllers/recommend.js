module.exports = {
  getRecommendedLessons(lessons, indicator) {
    return lessons.slice(0, 5); //indicatorをもとにしたレコメンドのロジックはDemoDayまでに実装
  },
};
