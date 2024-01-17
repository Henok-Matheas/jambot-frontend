export default async function handler(req, res) {
  console.log("backendUrl", backendUrl);
  try {
    const response = await fetch(backendUrl, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add any other headers your API requires
      },
      body: JSON.stringify(fields),
    });

    if (response.ok) {
      // Request was successful, handle the response
      const result = await response.json();
      console.log(result);
    } else {
      // Handle errors
      console.error("Failed to send POST request");
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(error.status || 500).end(error.message);
  }
}
