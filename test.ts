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
  
    const data = await response.json();
    console.log(data);
  }
  
  getCities();