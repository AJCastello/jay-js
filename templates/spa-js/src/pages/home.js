import { Button, Section } from "@jay-js/elements";

export function Home() {
  let count = 0;

  function handleCount(event) {
    count++;
    const target = event.target;
    target.innerHTML = `Count is ${count}`;
  }

  return Section({
    tag: "section",
    className: "flex flex-col justify-center items-center",
    children: [
      Button({
        className: "btn btn-primary normal-case",
        children: `Count is ${count}`,
        onclick: handleCount
      })
    ]
  })
}