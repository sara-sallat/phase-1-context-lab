function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(array) {
    return array.map(function (array) {
      return createEmployeeRecord(array);
    });
  }
  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(function (e) {
      return e.date === date;
    });
    let timeOut = this.timeOutEvents.find(function (e) {
      return e.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return parseFloat(wage.toString());
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function (record) {
      return record.firstName === firstName;
    });
  }
  
  function calculatePayroll(array) {
    return array.reduce(function (memo, rec) {
      return memo + allWagesFor.call(rec);
    }, 0);
  }
  
  const allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    let payable = eligibleDates.reduce(
      function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
      }.bind(this),
      0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable;
  };