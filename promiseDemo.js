const randomNumber = (digits) => Math.floor(Math.random()*(10**digits));

const asyncNumGenerator = () => new Promise((resolve, reject) => {
  // const successTime = randomNumber(4);
  // const failureTime = randomNumber(4);
  // console.log("about to be succeed in ", successTime);
  // console.log("about to be failed in ", failureTime);
  
  const generatedNumber = randomNumber(3);
  console.log(`randomly generated number is ${generatedNumber}`);

  let successTimer, failureTimer;
  successTimer = setTimeout(() => {
    resolve(generatedNumber);  
    clearTimeout(failureTimer)
  }, 1000)

  failureTimer = setTimeout(() => {
    reject({msg: "I fail fast. So i learn fast"});
    clearTimeout(successTimer);
  }, 2000)
})

const asyncAdd1000 = (number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("inside 2nd one");
    resolve(number + 1000);
  }, 1000);
});

asyncNumGenerator().then(asyncAdd1000).then((result) => {
  console.log(result);
});
