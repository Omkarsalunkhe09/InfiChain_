let ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

const sendData = (msg) => {
  ws.send(
    JSON.stringify({
      type: "subscribe",
      product_ids: [msg],
      channels: ["full"],
    })
  );
};

const data = () => {
  let msg = document.getElementById("val").value;
  if (msg === "---") return;
  sendData(msg);
};

ws.onopen = function () {
  sendData();
};

const sell_arr = [];
const buy_arr = [];

const avg = (elem) => {
  const res =
    elem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0) / elem.length;

  return res.toFixed(2);
};

const timer = setInterval(() => {
  appendData(buy_arr, "buy");
  appendData(sell_arr, "sell");
}, 5000);

const appendData = (payload, type) => {
  if (payload) {
    const result = avg(payload);
    const Price = document.querySelector(`#${type}`);

    Price.innerHTML = `${result}`;
  }
};

ws.onmessage = (event) => {
  event = JSON.parse(event.data);
  document.getElementById("time").innerHTML =
    event.time.substring(0, 10) + " " + event.time.substring(11, 19);

  if (event.side == "buy") {
    buy_arr.push(+event.price);
  }

  if (event.side == "sell") {
    sell_arr.push(+event.price);
  }
};
