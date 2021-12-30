import prisma from "../../../lib/prisma";

export default async function handle(req: Request, res: any) {
  const users = await prisma.user.findMany();
  res.json(users);
}