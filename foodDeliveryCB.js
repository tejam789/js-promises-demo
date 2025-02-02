const generateId = () => Math.floor(Math.random()*(10**10));

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

const deliverOrder = (order) => {
  setTimeout(() => {
    order.deliverDetails = `delivered by John at ${currentTime()}`
    order.status = "Order Delivered"
    logOrderDetails(order)
  }, 5000)
}
const packOrder = (order, deliverOrderCB) => {
  setTimeout(() => {
    order.packageDetails = "Packed in eco friendly bag";
    order.status = "Order packed"
    moveOrderStatusTo(order, "Delivering Order")
    deliverOrderCB(order);
  }, 2000)
}
const prepareFood = (order, packOrderCB) => {
    setTimeout(() => {
      order.foodDetails = "Burger & Fries";
      order.status = "Food is ready"
      moveOrderStatusTo(order, "Packing order");
      packOrderCB(order);
    }, 3000)
}

const createOrder = (prepareFoodCB) => {
    setTimeout(() => {
      const id = generateId();
      const startTime = Date.now();
      const order = {id, startTime, status: "Order recieved"}
      moveOrderStatusTo(order, "Preparing food")
      prepareFoodCB(order);
    }, 0)
}

const main = () => {
  const packOrderCB = (order) => packOrder(order, deliverOrder);
  const prepareFoodCB = (order) => prepareFood(order, packOrderCB);
  createOrder(prepareFoodCB)
}

main();
