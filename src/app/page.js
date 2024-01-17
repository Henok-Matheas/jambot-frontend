"use client";
import Script from "next/script";
import { useEffect } from "react";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  useEffect(() => {
    const constructPayload = (fieldsData) => {
      // Your payload hashmap
      let payloadMap = {
        name: "name",
        email: "email",
        chat_id: "telegram", // Map 'chat_id' to 'telegram' based on your requirement
        week_start: "some_title", // Map 'week_start' to the appropriate title in fieldsData
        week_end: "another_title", // Map 'week_end' to the appropriate title in fieldsData
      };

      // Create an empty payload object
      let payload = {};
      let schedule = {};

      // Iterate over the fields data and update payload
      fieldsData.forEach((field) => {
        if (field.title in payloadMap) {
          payload[field.title] = field.answer.value;
        }
        if (field.type === "MULTI_SELECT") {
          let answer = field.answer.value;
          let zones = answer.split(",");
          let day_time = field.title.split(" ");
          let day = day_time[0];
          let time = day_time[1];

          zones.forEach((zone) => {
            if (zone.toString().length !== 0) {
              schedule[`${day}_${time}_${zone}`] = undefined;
            }
          });
        }
      });

      payload["schedule"] = schedule;
      // Return the updated payload
      return payload;
    };

    const sendPostRequest = async (fields) => {
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
        } else {
          // Handle errors
          console.error("Failed to send POST request");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    window.addEventListener("message", (e) => {
      if (e?.data?.toString().includes("Tally.FormSubmitted")) {
        const payload = JSON.parse(e.data).payload;

        const fields = constructPayload(payload.fields);

        console.log("fields: ", fields);

        // send a post request to your backend
        sendPostRequest(fields);
      }
    });
  });
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/wadDMX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="284"
        title="Contact form"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          Tally.loadEmbeds();
        }}
      />
    </>
  );
}
