import fetch from "node-fetch";

async function getCities() {
  const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      apiKey: "ТВОЙ_API_КЛЮЧ",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {}
    })
  });

  const data = await response.json();
  console.log(data);
}

getCities();


export async function getWarehouses(req, res) {
  const cityRef = req.query.city;

  const result = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      apiKey: process.env.NP_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef
      }
    })
  });

  const data = await result.json();
  res.json(data.data);
}