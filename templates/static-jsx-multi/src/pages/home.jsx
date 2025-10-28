export function Home() {
  let count = 0;

  function handleCount(event) {
    count++;
    const target = event.target;
    target.innerHTML = `Count is ${count}`;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <button className="btn btn-primary normal-case" onclick={handleCount}>
        Count is {count}
      </button>
    </section>
  )
}