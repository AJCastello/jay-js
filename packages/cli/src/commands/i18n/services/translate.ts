function translateResultToString(inputArray: any[]): string | undefined {
  if (Array.isArray(inputArray[0])) {
    return inputArray[0]
      .flatMap(subArray => subArray[0] ? [subArray[0]] : [])
      .join("");
  }
}

export async function Translate(
  text: string,
  defaultLanguage: string,
  translateTo: string,
) {
  const uriEncondedText = encodeURIComponent(text);
  const translateRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${defaultLanguage}&tl=${translateTo}&dt=t&q=${uriEncondedText}`);
  const data = await translateRes.json();
  let translatedText = translateResultToString(data) || text;
  if (typeof translatedText !== "string") {
    throw new Error("Error translating text.");
  }
  return translatedText;
}