// type GeoResult = {
//   country?: string;
//   city?: string;
//   regionName?: string;
// };

// export async function getGeo(ip: string) {
//   try {
//     const response = await fetch(
//       `http://ip-api.com/json/${ip}`
//     );

//     const data = (await response.json()) as GeoResult;

//     return {
//       country: data.country || "Unknown",
//       city: data.city || "Unknown",
//       region: data.regionName || "Unknown",
//     };
//   } catch {
//     return {
//       country: "Unknown",
//       city: "Unknown",
//       region: "Unknown",
//     };
//   }
// }

type GeoResult = {
  ip?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  }
};

export async function getGeo(ip: string) {
  try {
    console.log("IP,", ip)
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_nQO3xo6c56S1U3qiNvKHcNATaldtA&ipAddress=${ip}`
    );
    console.log("Response,", response)

    const data = (await response.json()) as GeoResult;
    console.log("Data,", data)

    return {
      country: data?.location?.country || "Unknown",
      city: data?.location?.city || "Unknown",
      region: data?.location?.region || "Unknown",
    };
  } catch {
    return {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
    };
  }
}