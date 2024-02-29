export function getImageNameFormKey(imageUrl: string) {
  const imagePath = imageUrl?.split(".")?.[0];
  const namePath = imagePath?.split("/");
  const name = namePath[namePath.length - 1];
  return name;
}

export function calculateRangeArray(min: number, max: number) {
  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(`${i}`);
  }
  return result;
}
