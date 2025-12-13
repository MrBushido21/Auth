import express from "express";

const router = express.Router();

router.get("/np/cities", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();

    if (search.length < 2) {
      return res.json([]);
    }

    const result = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.NP_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: search,
          Limit: 20
        }
      })
    });

    const data = await result.json();

    res.json(data.data.map((city: any) => ({
      Ref: city.Ref,
      Description: city.Description,
      AreaDescription: city.AreaDescription
    })));
  } catch (err) {
    res.status(500).json({ error: "NP error" });
  }
});

router.get("/np/warehouses", async (req, res) => {
  try {
    const cityRef = String(req.query.cityRef || "");
    const search = String(req.query.search || "");

    if (!cityRef) {
      return res.status(400).json([]);
    }

    const result = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.NP_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef,
          FindByString: search,
          Limit: 20
        }
      })
    });

    const data = await result.json();

    res.json(
      (data.data || []).map((w: any) => ({
        Ref: w.Ref,
        Description: w.Description
      }))
    );
  } catch (err) {
    console.error("NP warehouses error:", err);
    res.status(500).json([]);
  }
});


export default router;
