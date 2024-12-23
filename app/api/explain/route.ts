import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const developerMessage = `
Classify the primary subject of the photo into one of the following categories, and follow the instructions for that category.
- Landmark: Explain the significance and history of this landmark, and any recommended itineraries related to this landmark
- Food: Explain the dish, ingredients and recipe for this food, and where one can find it
- Object: Explain the background of this object and where one could buy one as a souvenir
- Text: Translate this text to English and explain its significance
- Animal: Explain what animal this is, and where one could find more of these animals. Also explain where one could buy soft toys of this animal.
- Other: Explain what is in the photo
`;

export async function POST(request: Request) {
  const { base64Image } = await request.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: developerMessage,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: base64Image,
          },
        ],
      },
    ],
  });

  return result.toDataStreamResponse();
}
