import StepCounter from "./StepCounter";

// Props are read-only inputs; state is internal and changes over time.
function CounterApp() {
  return (
    <>
      <StepCounter initialValue={0} step={1} />
      <hr />
      <StepCounter initialValue={10} step={5} />
    </>
  );
}

export default CounterApp;
