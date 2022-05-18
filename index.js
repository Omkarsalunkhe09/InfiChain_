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
  document.getElementById("time").innerHTML = event.time
    .replace("T", " ")
    .replace(".", " ")
    .split(" ")
    .slice(0, 2)
    .join(" ");

  if (event.side == "buy") {
    document.getElementById("buy").innerHTML = event.price;
  }

  if (event.side == "sell")
    document.getElementById("sell").innerHTML = event.price;
};
