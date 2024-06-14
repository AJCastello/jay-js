
let subscriber: (() => void) | null = null;

export function state<T>(value: T) {
  const subscriptions = new Set<any>();
  return {
    get value() {
      if (subscriber) subscriptions.add(subscriber);
      return value;
    },
    set value(newValue: T) {
      value = newValue;
      subscriptions.forEach((fn) => fn());
    },
    toString() {
      return value;
    },
  };
}

export function effect(fn: () => void) {
  subscriber = fn;
  fn();
  subscriber = null;
}

export function derived<T>(fn: () => T) {
  const value = state(fn());
  effect(() => {
    value.value = fn();
  });
  return value;
}

export function html(strings: TemplateStringsArray, ...values: any[]) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      if (values[i] instanceof Array) {
        result += values[i].join("")
      } else {
        result += values[i];
      }
    }
  });
  return result;
}


// ----------



// let counter1 = state(0);
// let doubled = derived(() => counter1.value * 2);

// effect(() => {
//   console.log("Counter1:", counter1.value);
// });

// let comp1 = derived(() => {


//   return html`
//     <p class="${counter1.value >= 5 ? "bg-red-600" : ""}">
//       Counter 1 = ${counter1.value}!
//     </p>
//     <button id="btn1" class="bg-blue-500 rounded-sm p-1">inc 1</button>
//   `;
// });

// const App = () => {
//   let app = document.getElementById("app")!;

//   app.innerHTML = html`
//     <main class="flex flex-col gap-2 py-4">
//       ${comp1.value}
//       <p>Counter 1 * 2 = ${doubled.value}</p>
//     </main>
//   `;

//   app.querySelector("#btn1")?.addEventListener("click", () => {
//     counter1.value++;
//   });
// };

// effect(App);