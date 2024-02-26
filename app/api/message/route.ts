import {
  Message,
  NobleEd25519Signer,
  FarcasterNetwork,
  makeCastAdd,
} from "@farcaster/core";
import { hexToBytes } from "@noble/hashes/utils";
import { NextRequest, NextResponse } from "next/server";

const NETWORK = FarcasterNetwork.MAINNET; // Network of the Hub

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const SIGNER = body.signer;
    const FID = body.fid;
    const link = body.link;
    const message = body.castMessage;
    const parentUrl = body.parentUrl;
    if (!link) {
      console.log("Must have link");
      return NextResponse.json({ error: "No link provided" });
    }

    const dataOptions = {
      fid: FID,
      network: NETWORK,
    };
    // Set up the signer
    const privateKeyBytes = hexToBytes(SIGNER.slice(2));
    const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);

    const castBody = {
      text: message,
      embeds: [{ url: link }],
      embedsDeprecated: [],
      mentions: [],
      mentionsPositions: [],
      parentUrl: parentUrl,
    };

    const castAddReq: any = await makeCastAdd(
      castBody,
      dataOptions,
      ed25519Signer,
    );
    const castAdd: any = castAddReq._unsafeUnwrap();

    const messageBytes = Buffer.from(Message.encode(castAdd).finish());

    const castRequest = await fetch(
      "https://hub.pinata.cloud/v1/submitMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: messageBytes,
      },
    );

    const castResult = await castRequest.json();
    console.log(castResult);

    if (!castResult.hash) {
      return NextResponse.json({ "Error": "Failed to send cast" }, { status: 500 });
    } else {
      let hex = Buffer.from(castResult.hash).toString("hex");
      return NextResponse.json({ hex }, {status: 200});
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "server error": error });
  }
}
