const Name = prompt("نام تان را وارد کنید");
const task = prompt("وظیفه را وارد کنید ");
const Time = prompt("بعد از چند میلی ثانیه هشدار داده شود ؟");
// const clock = Number(prompt(" ساعت هشدار ؟"));
// const minute = Number(prompt("دقیقه ؟"));

//  تسک تعداد
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

let counter = makeCounter();

//
let pos = {};

let valid = new Proxy(pos, {
  set(target, prop, value) {
    // if (prop === "clock") {
    //   if (value < 0 || value > 23) {
    // //     throw new RangeError("ساعت را اشتباه انتخاب کردید ");
    //   }
    // } else if (prop === "minute") {
    //   if (value < 0 || value > 59) {
    //     throw new RangeError("دقیقه را اشتباه انتخاب کردید ");
    //   }

    if (prop === "Name") {
      if (!value || value.trim() === "") {
        throw new Error("عنوان نام الزامی است");
      }
    } else if (prop === "task") {
      if (!value || value.trim() === "") {
        throw new Error("عنوان وظیفه الزامی است");
      }
    } else if (prop === "Time") {
      if (!value || value.trim() === "") {
        throw new Error("زمان وظیفه الزامی است");
      }
    } else {
      console.log("ورودی ها به درستی وارد شدند");
    }

    target[prop] = value;

    return true;
  },
});

// valid.clock = clock;
// valid.minute = minute;
valid.Name = Name;
valid.task = task;
valid.Time = Time;

// const date = .getTime();
// const newdate = new Date().getTime();
// const Times = date - newdate;

function Dailytasks(task) {
  return new Promise((X) => {
    setTimeout(() => X(task), Time);
  });
}

async function gettask() {
  let data = await Dailytasks(valid.task);
  console.log(data);
}

// function Checking(task) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         counter.increment();
//         resolve({
//           masssage: "با موفقیت انجام شد ",
//           task,
//         });
//       } catch (err) {
//         reject(err);
//       }
//     }, Time);
//   });
// }

// Checking();
gettask();
console.log(pos);
