import { NextResponse } from "next/server";
import { getCovalentChainName } from "~~/hooks/func/Covalent";

export async function GET(
  request: Request,
  { params }: { params: { chainId: string; address: string } }
) {
  try {
    const { chainId, address } = params;
    const chainIdNum = parseInt(chainId);
    const chainName = getCovalentChainName(chainIdNum);
    
    // Get historical prices from Covalent
    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/portfolio_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch price data: ${data.error_message}`);
    }

    // Extract price history
    const priceHistory = data.data?.items?.[0]?.holdings?.map((holding: any) => ({
      date: new Date(holding.timestamp).toLocaleDateString(),
      price: holding.quote_rate || 0
    })) || [];

    // Sort by date
    priceHistory.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(priceHistory);
  } catch (error) {
    console.error("Error fetching price data:", error);
    return new NextResponse("Failed to fetch price data", { status: 500 });
  }
}
