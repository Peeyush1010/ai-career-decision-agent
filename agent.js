async function callLPITool(toolName, input) {
  return `Response from ${toolName} for ${input}`;
}

async function careerAgent(input) {
  // Input validation
  if (!input || !input.interest || !input.budget || !input.location) {
    return {
      error: "Missing required fields: interest, budget, location"
    };
  }

  try {
    const insights = await callLPITool("get_insights", input.interest);
    const knowledge = await callLPITool("query_knowledge", input.interest);

    let recommendation = `Based on your interest in ${input.interest}, `;

    if (input.budget === "low") {
      recommendation +=
        "you should consider affordable options like Germany or India. ";
    } else {
      recommendation +=
        "you can explore countries like USA, UK, or Canada. ";
    }

    return {
      recommendation,
      insights,
      knowledge,
      reasoning: [
        "Insight tool analyzed the student's academic interest.",
        "Knowledge tool provided relevant study destination information.",
        "Budget preference was used to refine recommendations."
      ],
      sources: ["get_insights", "query_knowledge"]
    };
  } catch (error) {
    return {
      error: "Something went wrong while generating recommendation."
    };
  }
}

// Example run
careerAgent({
  interest: "Artificial Intelligence",
  budget: "medium",
  location: "international"
}).then(result => console.log(result));