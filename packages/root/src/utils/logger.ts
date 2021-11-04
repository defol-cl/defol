export const logger = (data: any, text: string = "Input:") => {
  console.log(text, JSON.stringify(data, null, 2));
}