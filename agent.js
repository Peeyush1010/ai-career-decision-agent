async function get_insights(topic) {
  // Simulated LPI Tool Call 1
  return `LPI get_insights response for ${topic}`;
}

async function query_knowledge(topic) {
  // Simulated LPI Tool Call 2
  return `LPI query_knowledge response for ${topic}`;
}

async function careerAgent(input) {
  // Input validation
  if (!input || !input.interest || !input.budget || !input.location) {
    return {
      error: "Missing required fields: interest, budget, location"
    };
  }

  if (typeof input.interest !== "string") {
    return {
      error: "Interest must be text."
    };
  }

  try {
    // Calling two LPI tools
    const insights = await get_insights(input.interest); // Tool 1
    const knowledge = await query_knowledge(input.interest); // Tool 2

    let recommendation = `Based on your interest in ${input.interest}, `;

    if (input.budget === "low") {
      recommendation +=
        "you should consider affordable options like Germany or India.";
    } else {
      recommendation +=
        "you can explore countries like USA, UK, or Canada.";
    }

    return {
      recommendation,
      insights,
      knowledge,
      reasoning: [
        "LPI get_insights analyzed the academic interest.",
        "LPI query_knowledge returned destination information.",
        "Budget preference refined the recommendation."
      ],
      sources: ["get_insights", "query_knowledge"]
    };
  } catch (error) {
    console.error(error);
    return {
      error: "LPI tool request failed."
    };
  }
}

// Example Run
careerAgent({
  interest: "Artificial Intelligence",
  budget: "medium",
  location: "international"
}).then(result => console.log(result));