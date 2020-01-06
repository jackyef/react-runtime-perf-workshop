const getWorker = () => {
  return import('comlink-loader?inline!./heavyCalculation.worker').then(m => new m.default());
};

export default getWorker;
