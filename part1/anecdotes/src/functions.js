//Select a random number between a and b (b excluded)
export const random = (a,b) => {
    const randomNumber = Math.floor(Math.random() * (b - a)) + a;
    return randomNumber;
};

//make an object like {0:0, 1:0, 2:0,... n:0}
export const zeroObject = (n) => {
    let zero = {};
    
    for (let i = 0; i < n; i++) {
      zero[i] = 0;
    }
    
    return zero;
};