export default function handler(req: any, res: any) {
  console.log("🔥 Test route hit");
  res.status(200).json({ message: "API is working" });
}