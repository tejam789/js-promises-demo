const randomNumber = (digits) => Math.floor(Math.random()*(10**digits));

const currentTime = () => new Date().toTimeString().split(" ")[0];

const moveOrderStatusTo = (order, nextStatus) => {
  logOrderDetails(order);
  order.status = nextStatus;
  logOrderStatus(order.status);
}

const logOrderStatus = (status) => {
  console.log(`${status}...`);
}

const orderDetailWithoutTime = (order) => {
  const details = {...order}
  delete details.startTime;
  return JSON.stringify(details);
}

const timeDiffFrom  = (time) => {
  const diff = Date.now() - time;
  return (diff/1000).toFixed(2);
}

const logOrderDetails = (order) => {
  const timeTakenSoFar = timeDiffFrom(order.startTime);
  const orderDetails = orderDetailWithoutTime(order)
  console.log(`[${timeTakenSoFar}s] ${order.status}: ${orderDetails}`);
  
}

const createOrder = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const id = randomNumber();
      const startTime = Date.now();
      const order = {id, startTime, status: "Order recieved"}
      moveOrderStatusTo(order, "Preparing food")
      resolve(order);
    }, 0)
  })
}

const prepareFood = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      order.foodDetails = "Burger & Fries";
      order.status = "Food is ready"
      moveOrderStatusTo(order, "Packing order");
      resolve(order);
    }, 2000)
  })
}

const packOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      order.packageDetails = "Packed in eco friendly bag";
      order.status = "Order packed"
      moveOrderStatusTo(order, "Delivering Order")
      resolve(order);
    }, 3000)
  })
}

const deliverOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      order.deliverDetails = `delivered by John at ${currentTime()}`
      order.status = "Order Delivered"
      logOrderDetails(order)
      resolve(order);
    }, 5000)
  })
}

createOrder().then(prepareFood).then(packOrder).then(deliverOrder).then((result) => {
  console.log("\n Your order is complete. Please rate this order");
})
