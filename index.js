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

ws.onmessage = (event) => {
  event = JSON.parse(event.data);
  console.log(event.time);
  document.getElementById("time").innerHTML =
    event.time.substring(0, 10) + " " + event.time.substring(11, 19);

  // if (event.side == "buy") {
  //   document.getElementById("buy").innerHTML = event.price;
  // }

  // if (event.side == "sell")
  //   document.getElementById("sell").innerHTML = event.price;
};
