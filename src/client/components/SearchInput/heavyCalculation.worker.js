export class HeavyCalculationWorker {
  doHeavyCalculation = () => {
    let a = 1;

    for (let i = 0; i < 100000000; i++) {
      a += 1;
    }

    return `Success!: ${Math.random() * 100}`;
  };
}
