export default async function handler(req, res) {
  const { amount, from, to } = req.query;

  const response = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
  );

  const data = await response.json();

  res.status(200).json(data);
}
