export default async function handler(req, res) {
  // 允许 CORS（给浏览器用）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 处理预检
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 🔴 这里是你的 Coze workflow 地址
    const COZE_URL = "https://xhb8dw3nwg.coze.site/run";

    // 🔴 这里是你的 token（⚠️只放在这里，前端不再出现）
    const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0YjgyZWQ2LTJhYWMtNDQ2Mi1iNWNkLTU4OTVlN2QyMGY5OSJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3plLmNuIiwiYXVkIjpbIkhvTGs3UWFiVXNtSjRJdENiSVVsRHhkNEZGMG9icXJwIl0sImV4cCI6ODIxMDI2Njg3Njc5OSwiaWF0IjoxNzY4OTcwMTUxLCJzdWIiOiJzcGlmZmU6Ly9hcGkuY296ZS5jbi93b3JrbG9hZF9pZGVudGl0eS9pZDo3NTk3NDcyNTg1MzE1NTE2NDYyIiwic3JjIjoiaW5ib3VuZF9hdXRoX2FjY2Vzc190b2tlbl9pZDo3NTk3NjY4OTQ4OTUxMTcxMTE4In0.tm13hqaWqc92T4Rizo4glLLBlu_KO0ysv4lWwT_y73uIf4XAMAG-C_0R3Gbh8GQBwMtJnUaTv9uzaf88gx296F_3HIOo1yN_SDPSXCRpWVDk2IQWn3Hbb8u6BbJgPIYRm343FLeAiOenaQS7bCymas66GDxQvKjgPe6hAI5xodpmcwmUDxzQOySqF8VUADCSpHAsnCSrZC5Ho77IJyD8AvIwm16DJcvTlSqYuhc23034Bq5cxff66gBggEJuZC8knLvXdrQNV_sFLetMWkc8sOmRuPwV-XBokyJHbNGS6flVZMfOTrIpXgX8vH9MxYTDFqInbotjXaDZd6Ul9XScEA";

    const response = await fetch(COZE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      },
      body: req.body
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      conversion_status: "failed",
      error_message: "Proxy error"
    });
  }
}
