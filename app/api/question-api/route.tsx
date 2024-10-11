import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    const parsedResult = JSON.parse(responseText);
    return NextResponse.json({ result: parsedResult });
  } catch (error: any) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error details:", error.response.data?.errorDetails);

      // Log field violations if they exist
      if (error.response.data?.errorDetails) {
        error.response.data.errorDetails.forEach((detail: any) => {
          console.error("Field Violations:", detail.fieldViolations);
        });
      }
    } else {
      console.error("Error processing request:", error.message || error);
    }

    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
};
