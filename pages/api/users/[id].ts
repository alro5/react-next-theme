import prisma from "../../../lib/prisma";

export default async function handle(req: any, res: any) {
  const id = req.query.id;

  if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id
        }
      });
    
      res.json(deletedUser);
    } catch(e) {
      return res.status(400).send(e)
    }
  }

  if (req.method === 'PUT') {
    const { name, email, id } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: name,
        email: email
      }
    });
  
    res.json(updatedUser);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  }); 
  res.json(user);
}