const timer = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export default timer;
