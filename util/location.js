const API = "067f787369e54a49b0e20171f69eadba";
export function getMapPreview(lat, lng) {
  //   console.log(lng);
  //   console.log(lat);
  //   return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng},NY&zoom=13&size=600x300&maptype=roadmap
  // &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API}`;

  const preview = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=200&height=200&center=lonlat:${lng},${lat}&zoom=12&marker=lonlat:${lng},${lat};color:%23ff0000;size:small&apiKey=${API}`;

  return preview;
}
export async function getAddress(lat, lng) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${API}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch error");
  }
  const data = await response.json();
  // console.log(data.results[0].formatted);
  const address = data.results[0].formatted;
  return address;
}
