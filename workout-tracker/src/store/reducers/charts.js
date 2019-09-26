import * as type from "../actions/chartActions";

const initialState = {
  weeklyChart: {
    labels: ["Red", "Green", "Yellow"],
    data: [1],
    backgroundColor: [
      "#f6f078",
      "#01d28e",
      "#434982",
      "#730068",
      "#a6e3e9",
      "##36A2EB",
      "#51dacf",
      "#edaaaa"
    ],
    hoverBackgroundColor: [
      "#f6f078",
      "#01d28e",
      "#434982",
      "#730068",
      "#a6e3e9",
      "##36A2EB",
      "#51dacf",
      "#edaaaa"
    ]
  },
  monthlyChart: {
    labels: ["Red", "Green", "Yellow"],
    data: [1, 5, 6, 7],
    backgroundColor: [
      "#f6f078",
      "#01d28e",
      "#434982",
      "#730068",
      "#a6e3e9",
      "##36A2EB",
      "#51dacf",
      "#edaaaa"
    ],
    hoverBackgroundColor: [
      "#f6f078",
      "#01d28e",
      "#434982",
      "#730068",
      "#a6e3e9",
      "##36A2EB",
      "#51dacf",
      "#edaaaa"
    ]
  },
};

const charts = (state = initialState, action) => {
  switch (action.type) {
    case type.CALCULATE_WEEKLY_CHART:
      let workoutNames = [];
      let workouts = [];

      action.workouts.map(workout => {
        workoutNames.push(workout.workout_name);
        workouts.push(workout);
        return workout;
      });

      let weekMap = [6, 0, 1, 2, 3, 4, 5];

      function startAndEndOfWeek(date) {
        let now = new Date(date);
        now.setHours(0, 0, 0, 0);
        let monday = new Date(now);
        monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
        let sunday = new Date(now);
        sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
        sunday.setHours(23, 59, 59, 999);
        return [monday, sunday];
      }

      let startAndEndWeek = startAndEndOfWeek(new Date());

      let getDaysArray = function(s, e) {
        for (var a = [], d = s; d <= e; d.setDate(d.getDate() + 1)) {
          a.push(new Date(d));
        }
        return a;
      };
      let daylist = getDaysArray(startAndEndWeek[0], startAndEndWeek[1]);
      daylist.map(v => v.toISOString().slice(0, 10)).join("");

      let daysInWeek = [];

      function formatDate(date) {
        let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      for (let i = 0; i < daylist.length; i++) {
        daysInWeek.push(
          formatDate(daylist[i])
            .split("-")
            .join("")
        );
      }

      let userHistory = action.history;
      let resultOfWeek = [];

      for (let j = 0; j < daysInWeek.length; j++) {
        for (let i = 0; i < userHistory.length; i++) {
          if (
            userHistory[i].session_start
              .match(/.{1,10}/g)[0]
              .split("-")
              .join("") === daysInWeek[j]
          ) {
            resultOfWeek.push(userHistory[i]);
          }
        }
      }

      let hashTable = {};

      for (let j = 0; j < workouts.length; j++) {
        hashTable[workouts[j].workout_name] = 0;
      }

      for (let i = 0; i < resultOfWeek.length; i++) {
        for (let j = 0; j < workouts.length; j++) {
          if (resultOfWeek[i].workout_id === workouts[j].id) {
            if (hashTable[workouts[j].workout_name]) {
              hashTable[workouts[j].workout_name] += 1;
            } else {
              hashTable[workouts[j].workout_name] = 1;
            }
          }
        }
      }

      let valuesForDataset = [];

      for (var value in hashTable) {
        valuesForDataset.push(hashTable[value]);
      }

      // this.setState({
      //   data: valuesForDataset,
      //   labels: workoutNames
      // });

      let copyOfWeeklyChart = { ...state.weeklyChart };
      copyOfWeeklyChart.data = valuesForDataset;
      copyOfWeeklyChart.labels = workoutNames;
      debugger;
      return {
        ...state,
        weeklyChart: copyOfWeeklyChart
      };

    default:
      return state;
  }
};

export default charts;
