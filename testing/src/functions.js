export const esPrimo = (num) => {
    if (num < 4) {
      return true;
    }
  
    const root_num = num ** (1 / 2);
    let count = 2;
  
    while (count <= root_num) {
      if (num % count === 0) {
        return false;
      }
      count += 1;
    }
  
    return true;
};
  
export const siguiente = (num) => {
    num += 1;
  
    while (true) {
        if (esPrimo(num)) {
            return num;
        }
        num += 1;
    }
};