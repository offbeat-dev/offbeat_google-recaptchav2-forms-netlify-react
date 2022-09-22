exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      // Block GET requests
      return { statusCode: 400, body: null };
    }

    const Hubspot = require("hubspot");
    const hubspot = new Hubspot({
      accessToken: "pat-na1-6998c637-076e-43d5-a902-3f9649561d13",
    });

    const body = JSON.parse(event.body);
    console.log("event.body", event.body);
    console.log("body", body);

    const properties = [{ property: "firstname", value: body.firstName }];

    const contact = await hubspot.contacts.createOrUpdate(body.form.email, {
      properties,
    });

    // Return a 200 if it succeeds
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.log("error", err);
    return { statusCode: 500, body: err.toString() };
  }
};