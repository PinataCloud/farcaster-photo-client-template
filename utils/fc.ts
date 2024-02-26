export async function getFnameFromFid(fid: any): Promise<string> {
  const result = await fetch(
    `https://hub.pinata.cloud/v1/userDataByFid?fid=${fid}&user_data_type=USER_DATA_TYPE_USERNAME`,
  );
  const resultData = await result.json();
  const fname = resultData?.data?.userDataBody?.value || fid;
  return fname;
}

export async function cronFeed(channel: any, nextPage: any) {
  try {
    const result = await fetch(
      `https://hub.pinata.cloud/v1/castsByParent?url=${channel}&pageSize=20&reverse=true&pageToken=${nextPage}`,
    );
    const resultData = await result.json();
    const pageToken = resultData.nextPageToken;
    const casts = resultData.messages;
    const simplifiedCasts = await Promise.all(
      casts.map(async (cast: any) => {
        const fname = await getFnameFromFid(cast.data.fid);
        return {
          fid: fname,
          castAddBody: cast.data.castAddBody,
          pageToken: pageToken,
        };
      }),
    );
    return simplifiedCasts;
  } catch (error) {
    console.log(error);
    return error;
  }
}
