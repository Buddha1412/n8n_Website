import { NextRequest, NextResponse } from "next/server";

// Simple endpoint for n8n to send responses back
export async function POST(request: NextRequest) {
  try {
    // Required API key check
    const apiKey = request.headers.get('x-api-key');
    const expectedApiKey = 'boom-portfolio-2024';

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        {
          error: "Unauthorized - API key required",
          message: "Please include 'x-api-key: boom-portfolio-2024' in headers"
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("n8n response received:", body);

    // Extract response from various possible formats
    const response = body.response || body.message || body.reply || body.text || "ไม่สามารถประมวลผลคำตอบได้";

    // Log the response for debugging
    console.log("Processed response:", response);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Response received successfully",
      processedResponse: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("n8n response error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process n8n response",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

