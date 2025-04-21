interface GroqRequestMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateAIResponse = async (
  messages: GroqRequestMessage[]
): Promise<string> => {
  try {
    const apiKey = "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";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data: GroqResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
