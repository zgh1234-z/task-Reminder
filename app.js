// const Name = prompt("نام تان را وارد کنید");
// const task = prompt("وظیفه را وارد کنید");
// const Time = Number(prompt("بعد از چند میلی‌ثانیه هشدار داده شود؟"));

// function makeCounter() {
//   let count = 0;
//   return {
//     increment() {
//       count++;
//     },
//     gitcount() {
//       return count;
//     },
//   };
// }

// const counter = makeCounter();
// const pos = {};

// const valid = new Proxy(pos, {
//   set(target, prop, value) {
//     if (prop === "Name") {
//       if (!value || value.trim() === "") {
//         throw new Error("نام الزامی است");
//       }
//     } else if (prop === "task") {
//       if (!value || value.trim() === "") {
//         throw new Error("وظیفه الزامی است");
//       }
//     } else if (prop === "Time") {
//       if (typeof value !== "number" || value <= 0) {
//         throw new Error("زمان باید عدد مثبت باشد");
//       }
//     } else {
//       throw new Error("property نامعتبر");
//     }

//     target[prop] = value;
//     return true;
//   },
// });

// valid.Name = Name;
// valid.task = task;
// valid.Time = Time;

// function Dailytasks(task) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       counter.increment();
//       resolve({
//         message: "تسک با موفقیت ثبت شد",
//         task,
//       });
//     }, 1000);
//   });
// }

// function Checking(task) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`⏰ یادآوری: ${task}`);
//     }, valid.Time);
//   });
// }

// async function run() {
//   try {
//     const registerResult = await Dailytasks(valid.task);
//     console.log(registerResult.message);
//     console.log("تعداد تسک‌ها:", counter.gitcount());

//     const reminder = await Checking(valid.task);
//     console.log(reminder);
//   } catch (err) {
//     console.error("خطا:", err.message);
//   }
// }

// run();
// console.log("Task Object:", pos);

const Name = prompt("نام تان را وارد کنید");
const task = prompt("وظیفه را وارد کنید");
const hour = Number(prompt("ساعت (0 تا 23)"));
const minute = Number(prompt("دقیقه (0 تا 59)"));

function makeCounter() {
  let count = 0;
  return {
    increment() {
      count++;
    },
    gitcount() {
      return count;
    },
  };
}

const counter = makeCounter();

const pos = {};

const valid = new Proxy(pos, {
  set(target, prop, value) {
    if (prop === "Name") {
      if (!value || value.trim() === "") {
        throw new Error("نام الزامی است");
      }
    } else if (prop === "task") {
      if (!value || value.trim() === "") {
        throw new Error("وظیفه الزامی است");
      }
    } else if (prop === "hour") {
      if (value < 0 || value > 23) {
        throw new Error("ساعت باید بین 0 تا 23 باشد");
      }
    } else if (prop === "minute") {
      if (value < 0 || value > 59) {
        throw new Error("دقیقه باید بین 0 تا 59 باشد");
      }
    } else {
      throw new Error("property نامعتبر");
    }

    target[prop] = value;
    return true;
  },
});

valid.Name = Name;
valid.task = task;
valid.hour = hour;
valid.minute = minute;

function calcDelay(hour, minute) {
  const now = new Date();

  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return target - now; 
}

const delay = calcDelay(valid.hour, valid.minute);

function Dailytasks(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      counter.increment();
      resolve("تسک با موفقیت ثبت شد");
    }, 1000);
  });
}

function Checking(task, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`⏰ یادآوری: ${task}`);
    }, delay);
  });
}

async function run() {
  try {
    const register = await Dailytasks(valid.task);
    console.log(register);
    console.log("تعداد تسک‌ها:", counter.gitcount());

    const reminder = await Checking(valid.task, delay);
    console.log(reminder);
  } catch (err) {
    console.error("خطا:", err.message);
  }
}

run();
console.log("Task Object:", pos);
