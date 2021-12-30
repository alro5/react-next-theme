import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// Create user 
app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { name, email } : { name: string, email: string } = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email
      }
    })
    res.json(user); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PrismaError.UniqueConstraintViolation) {
        return res.status(400).send({
          statusText: 'User with this email already exist.',
          code: PrismaError.UniqueConstraintViolation
        });
      }
    }
    throw e;
  }
});

// Get all users
app.get('/api/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get single user
app.get('/api/user/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  }); 
  res.json(user);
});

// Update single user
app.put('/api/user', async (req: Request, res: Response) => {
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
});

// Delete user
app.delete('/api/user/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
      where: {
        id: id
      }
    });
  
    res.json(deletedUser);
  } catch(e) {
    return res.status(400).send(e)
  }
})

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});