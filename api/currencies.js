export default async function handler(req, res) {
  const response = await fetch("https://api.frankfurter.app/currencies");

  const data = await response.json();

  res.status(200).json(data);
}
