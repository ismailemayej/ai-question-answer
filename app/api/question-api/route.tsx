import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    const parsedResult = JSON.parse(responseText);
    return NextResponse.json({ result: parsedResult });
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const apiError = error as {
        response: {
          status: number;
          data?: { errorDetails?: Array<{ fieldViolations: unknown }> };
        };
      };
      console.error("Error status:", apiError.response.status);
      console.error("Error details:", apiError.response.data?.errorDetails);

      if (apiError.response.data?.errorDetails) {
        apiError.response.data.errorDetails.forEach((detail) => {
          console.error("Field Violations:", detail.fieldViolations);
        });
      }
    } else if (error instanceof Error) {
      console.error("Error processing request:", error.message);
    } else {
      console.error("Error processing request:", String(error));
    }
    return NextResponse.json(
      {
        error:
          "An error occurred while processing the request to server response.please wail few seconds",
      },
      { status: 500 }
    );
  }
};
