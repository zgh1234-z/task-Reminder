const name = prompt("نام تان را وارد کنید");
const task = prompt("وظیفه را وارد کنید ");
const clock = Number(prompt(" ساعت هشدار ؟"));
const main = Number(prompt("دقیقه ؟"));

function createtaskcounter() {
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
let pos = {};

let valid = new Proxy(pos, {
  set(target, prop, value) {
    if (prop === "cloce") {
      if (value < 0 || value > 23) {
        throw new RangeError("ساعت را اشتباه انتخاب کردید ");
      }
    } else if (prop === "minute") {
      if (value < 0 || value > 59) {
        throw new RangeError("دقیقه را اشتباه انتخاب کردید ");
      }
    } else if (prop === "task") {
      if (!value || value.trim() === "") {
        throw new Error("عنوان وظیفه الزامی است");
      } else {
        throw new Error("'cloce' و 'minute' مجاز هستند");
      }

      target[prop] = value;

      return true;
    }
  },
});

valid.cloce = clockInput;
valid.minute = mainInput;

const Times = valid.cloce * 3600000 + valid.minute * 60000;

function Dailytasks(task) {
  return new Promise((X) => {
    setTimeout(() => X(task), Times);
  });
}

async function gettask() {
  let data = await Dailytasks();
  console.log(date);
}

gettask();

function Checking(task) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        counter.increment();
        resolve({
          masssage: "با موفقیت انجام شد ",
          task,
        });
      } catch (err) {
        reject(err);
      }
    }, 10000);
  });
}
