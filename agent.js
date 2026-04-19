async function get_insights(topic) {
  return `Insights generated for ${topic}`;
}

async function query_knowledge(topic) {
  return `Knowledge retrieved for ${topic}`;
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
    const insights = await get_insights(input.interest);
    const knowledge = await query_knowledge(input.interest);

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
        "get_insights analyzed the student's academic interest.",
        "query_knowledge provided destination information.",
        "Budget preference refined final recommendation."
      ],
      sources: ["get_insights", "query_knowledge"]
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Tool request failed."
    };
  }
}

// Example run
careerAgent({
  interest: "Artificial Intelligence",
  budget: "medium",
  location: "international"
}).then(result => console.log(result));