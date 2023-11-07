import { Button } from "@jay-js/ui";

export function Home() {
  let count = 0;

  function handleCount(event: MouseEvent) {
    count++;
    const target = event.target as HTMLButtonElement;
    target.innerHTML = `Count is ${count}`;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <Button color="btn-primary" className="normal-case" onclick={handleCount}>
        Count is {count}
      </Button>
    </section>
  )
}