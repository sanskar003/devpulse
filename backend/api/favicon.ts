export default function handler(req: any, res: any) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).end(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <rect width="64" height="64" fill="black"/>
      <text x="50%" y="50%" font-size="32" fill="white" text-anchor="middle" dy=".35em">D</text>
    </svg>
  `);
}