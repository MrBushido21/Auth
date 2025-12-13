// import fetch from "node-fetch";

<<<<<<< HEAD
// async function getCities() {
//   const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       apiKey: "ef5ab3437ffe1dae911ed5108e39d188",
//       modelName: "Address",
//       calledMethod: "getCities",
//       methodProperties: {}
//     })
//   });
=======
async function getCities() {
  const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      apiKey: "ef5ab3437ffe1dae911ed5108e39d188",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {}
    })
  });
>>>>>>> 72c185fe0292accb2495a4fc7484b6da4b4805d2

//   const data = await response.json();
//   console.log(data);
// }

// getCities();


// export async function getWarehouses(req, res) {
//   const cityRef = req.query.city;

//   const result = await fetch("https://api.novaposhta.ua/v2.0/json/", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       apiKey: process.env.NP_KEY,
//       modelName: "Address",
//       calledMethod: "getWarehouses",
//       methodProperties: {
//         CityRef: cityRef
//       }
//     })
//   });

//   const data = await result.json();
//   res.json(data.data);
// }