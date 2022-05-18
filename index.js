let ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

const sendData = (query) => {
  ws.send(
    JSON.stringify({
      type: "subscribe",
      product_ids: [query],
      channels: ["full"],
    })
  );
};

const data = () => {
  let query = document.querySelector("#val").value;
  if (query === "---") return;
  sendData(query);
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
