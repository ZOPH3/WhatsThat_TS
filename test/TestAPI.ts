export const myFirstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success!");
    }, 250);
  });
  
  myFirstPromise.then((successMessage) => {
    console.log(`Yay! ${successMessage}`);
  });
  