async function callLPITool(toolName, input) {
  return `Response from ${toolName} for ${input}`;
}

async function careerAgent(input) {
  const insights = await callLPITool("get_insights", input.interest);
  const knowledge = await callLPITool("query_knowledge", input.interest);

  let recommendation = `Based on your interest in ${input.interest}, `;

  if (input.budget === "low") {
    recommendation += "you should consider affordable options like Germany or India. ";
  } else {
    recommendation += "you can explore countries like USA, UK, or Canada. ";
  }

  return {
    recommendation,
    insights,
    knowledge,
    sources: ["get_insights", "query_knowledge"]
  };
}

careerAgent({
  interest: "Artificial Intelligence",
  budget: "medium",
  location: "international"
}).then(result => console.log(result));