const isBase64 = (str: string): boolean => {
  let res: boolean;
  try {
    window.atob(str);
    res = true;
  } catch {
    res = false;
  }
  return res;
};

export { isBase64 };
