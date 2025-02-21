import { config } from "dotenv";
import express from "express";
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from './utils/appError';
import teamRouter from './routes/teamRoutes'
import playerRouter from './routes/playerRoutes'
import authRouter from './routes/authRoutes'

import crypto from 'crypto';
const app = express();

const prisma = new PrismaClient()

// const randomNumber = crypto.randomBytes(64).toString("hex", 16);
// console.log(randomNumber);

async function createTeams() {
  await prisma.team.deleteMany();
  const teams = await prisma.team.createMany({
    data: [
      { name: 'Al Ahly SC', shirtColor: 'Red' },
      { name: 'Zamalek SC', shirtColor: 'White' },
      { name: 'Pyramids FC', shirtColor: 'Blue' },
      { name: 'Al Masry Club', shirtColor: 'Green' },
      { name: 'National Bank of Egypt SC', shirtColor: 'Yellow' },
      { name: 'Haras El Hodood', shirtColor: 'Black' },
      { name: 'Ceramica Cleopatra', shirtColor: 'Purple' },
      { name: 'Petrojet FC', shirtColor: 'Orange' },
      { name: 'Pharco FC', shirtColor: 'Pink' },
      { name: 'Talaea El Gaish', shirtColor: 'Gray' },
      { name: 'Smouha SC', shirtColor: 'Brown' },
      { name: 'Zed FC', shirtColor: 'Silver' },
      { name: 'Al Ittihad Al Sakandary', shirtColor: 'Gold' },
      { name: 'Ismaily SC', shirtColor: 'Maroon' },
      { name: 'Ghazl El Mahallah', shirtColor: 'Navy' },
      { name: 'El Gouna FC', shirtColor: 'Cyan' },
      { name: 'Enppi Club', shirtColor: 'Violet' },
      { name: 'Modern Sport FC', shirtColor: 'Indigo' }
    ]
  })
  console.log(teams);
}

async function createPlayers() {
  await prisma.player.deleteMany()
  const players = await prisma.player.createMany({
    data: [
  // Al Ahly SC - Team ID: 'd51ae732-2667-46c8-ad9c-061d293fdd25'
  { name: 'Ahmed Ali', age: 28, salary: 90000, teamId: 'd51ae732-2667-46c8-ad9c-061d293fdd25' },
  { name: 'Mahmoud Hassan', age: 26, salary: 85000, teamId: 'd51ae732-2667-46c8-ad9c-061d293fdd25' },
  { name: 'Omar Mohamed', age: 27, salary: 88000, teamId: 'd51ae732-2667-46c8-ad9c-061d293fdd25' },

  // Zamalek SC - Team ID: '4353b534-b42f-4e4f-a2af-973181137a45'
  { name: 'Karim Hossam', age: 29, salary: 92000, teamId: '4353b534-b42f-4e4f-a2af-973181137a45' },
  { name: 'Mostafa Adel', age: 25, salary: 87000, teamId: '4353b534-b42f-4e4f-a2af-973181137a45' },
  { name: 'Youssef Ibrahim', age: 28, salary: 89000, teamId: '4353b534-b42f-4e4f-a2af-973181137a45' },

  // Pyramids FC - Team ID: 'f36d2387-e193-4f54-8193-486281e3ff6d'
  { name: 'Seif El Din', age: 27, salary: 84000, teamId: 'f36d2387-e193-4f54-8193-486281e3ff6d' },
  { name: 'Tarek Samir', age: 26, salary: 83000, teamId: 'f36d2387-e193-4f54-8193-486281e3ff6d' },
  { name: 'Walid Ahmed', age: 30, salary: 91000, teamId: 'f36d2387-e193-4f54-8193-486281e3ff6d' },

  // Al Masry Club - Team ID: '232485e3-e253-4577-87cc-47dd6455b44f'
  { name: 'Hussein Ali', age: 28, salary: 85000, teamId: '232485e3-e253-4577-87cc-47dd6455b44f' },
  { name: 'Nasser Salah', age: 27, salary: 82000, teamId: '232485e3-e253-4577-87cc-47dd6455b44f' },
  { name: 'Ayman Khaled', age: 29, salary: 88000, teamId: '232485e3-e253-4577-87cc-47dd6455b44f' },

  // National Bank of Egypt SC - Team ID: '4571539a-49f0-4a77-ac92-c4e739ee23e6'
  { name: 'Sherif Nabil', age: 26, salary: 80000, teamId: '4571539a-49f0-4a77-ac92-c4e739ee23e6' },
  { name: 'Hassan Magdy', age: 28, salary: 83000, teamId: '4571539a-49f0-4a77-ac92-c4e739ee23e6' },
  { name: 'Moustafa Fathi', age: 27, salary: 82000, teamId: '4571539a-49f0-4a77-ac92-c4e739ee23e6' },

  // Haras El Hodood - Team ID: 'e36d2111-5179-42a1-b2fc-67f9edab50d6'
  { name: 'Mahmoud Gamal', age: 29, salary: 81000, teamId: 'e36d2111-5179-42a1-b2fc-67f9edab50d6' },
  { name: 'Tamer Mohamed', age: 25, salary: 79000, teamId: 'e36d2111-5179-42a1-b2fc-67f9edab50d6' },
  { name: 'Adel Ahmed', age: 28, salary: 82000, teamId: 'e36d2111-5179-42a1-b2fc-67f9edab50d6' },

  // Ceramica Cleopatra - Team ID: '7c7479fc-b29e-4e2a-8916-7c8f168bd096'
  { name: 'Fady Samy', age: 27, salary: 80000, teamId: '7c7479fc-b29e-4e2a-8916-7c8f168bd096' },
  { name: 'Ibrahim Said', age: 26, salary: 81000, teamId: '7c7479fc-b29e-4e2a-8916-7c8f168bd096' },
  { name: 'Khaled Omar', age: 29, salary: 83000, teamId: '7c7479fc-b29e-4e2a-8916-7c8f168bd096' },

  // Petrojet FC - Team ID: 'f4e5901d-b4d9-486a-91dd-cd8174fe4966'
  { name: 'Samir Nassar', age: 28, salary: 80000, teamId: 'f4e5901d-b4d9-486a-91dd-cd8174fe4966' },
  { name: 'Yasser Fouad', age: 30, salary: 82000, teamId: 'f4e5901d-b4d9-486a-91dd-cd8174fe4966' },
  { name: 'Ali Hassan', age: 27, salary: 79000, teamId: 'f4e5901d-b4d9-486a-91dd-cd8174fe4966' },

  // Pharco FC - Team ID: '783d4b45-e30c-44bf-8417-f19194ccf6aa'
  { name: 'Osama Kamal', age: 26, salary: 81000, teamId: '783d4b45-e30c-44bf-8417-f19194ccf6aa' },
  { name: 'Hamdy Fathy', age: 28, salary: 84000, teamId: '783d4b45-e30c-44bf-8417-f19194ccf6aa' },
  { name: 'Gamal Farouk', age: 29, salary: 85000, teamId: '783d4b45-e30c-44bf-8417-f19194ccf6aa' },

  // Talaea El Gaish - Team ID: 'f4198c41-8cf0-411c-a4b9-5904e903e4cb'
  { name: 'Saad Mahmoud', age: 27, salary: 82000, teamId: 'f4198c41-8cf0-411c-a4b9-5904e903e4cb' },
  { name: 'Hady Riad', age: 25, salary: 80000, teamId: 'f4198c41-8cf0-411c-a4b9-5904e903e4cb' },
  { name: 'Amr Kamel', age: 28, salary: 83000, teamId: 'f4198c41-8cf0-411c-a4b9-5904e903e4cb' },

  // Smouha SC - Team ID: '64994747-4c1c-4277-92bc-aa7386c8dc17'
  { name: 'Bassam Morsy', age: 29, salary: 86000, teamId: '64994747-4c1c-4277-92bc-aa7386c8dc17' },
  { name: 'Mohamed Ashraf', age: 26, salary: 84000, teamId: '64994747-4c1c-4277-92bc-aa7386c8dc17' },
  { name: 'Eslam Magdy', age: 27, salary: 85000, teamId: '64994747-4c1c-4277-92bc-aa7386c8dc17' },

  // Zed FC - Team ID: '10324963-c73e-41c9-8833-2db1bf376c5e'
  { name: 'Yehia Nabil', age: 25, salary: 78000, teamId: '10324963-c73e-41c9-8833-2db1bf376c5e' },
  { name: 'Abdelrahman Emad', age: 27, salary: 80000, teamId: '10324963-c73e-41c9-8833-2db1bf376c5e' },
  { name: 'Mina Adel', age: 28, salary: 82000, teamId: '10324963-c73e-41c9-8833-2db1bf376c5e' },

  // Al Ittihad Al Sakandary - Team ID: 'b6b89cf0-9803-45d7-8994-c9b0ea5c8e8e'
  { name: 'Ashraf Sobhy', age: 29, salary: 84000, teamId: 'b6b89cf0-9803-45d7-8994-c9b0ea5c8e8e' },
  { name: 'Salem Hassan', age: 26, salary: 82000, teamId: 'b6b89cf0-9803-45d7-8994-c9b0ea5c8e8e' },
  { name: 'Mahdy Youssef', age: 28, salary: 83000, teamId: 'b6b89cf0-9803-45d7-8994-c9b0ea5c8e8e' },

  // Ismaily SC - Team ID: '09f552f6-01b3-451b-bc8c-8cd40b3a8692'
  { name: 'Ghanem Yasser', age: 27, salary: 80000, teamId: '09f552f6-01b3-451b-bc8c-8cd40b3a8692' },
  { name: 'Saif Mohamed', age: 25, salary: 79000, teamId: '09f552f6-01b3-451b-bc8c-8cd40b3a8692' },
  { name: 'Islam Gamal', age: 28, salary: 81000, teamId: '09f552f6-01b3-451b-bc8c-8cd40b3a8692' },

  // Ghazl El Mahallah - Team ID: '74e0c843-4087-4106-8c4d-21ad834a03f7'
  { name: 'Wael Fathy', age: 29, salary: 82000, teamId: '74e0c843-4087-4106-8c4d-21ad834a03f7' },
  { name: 'Ehab Soliman', age: 26, salary: 80000, teamId: '74e0c843-4087-4106-8c4d-21ad834a03f7' },
  { name: 'Sherif Ashraf', age: 27, salary: 81000, teamId: '74e0c843-4087-4106-8c4d-21ad834a03f7' },

  // El Gouna FC - Team ID: 'd5f26a79-8e2c-483a-a18c-63496cee43f6'
  { name: 'Reda Lotfi', age: 28, salary: 83000, teamId: 'd5f26a79-8e2c-483a-a18c-63496cee43f6' },
  { name: 'Magdy Tolba', age: 25, salary: 79000, teamId: 'd5f26a79-8e2c-483a-a18c-63496cee43f6' },
  { name: 'Emad Meteb', age: 30, salary: 85000, teamId: 'd5f26a79-8e2c-483a-a18c-63496cee43f6' },

  // Enppi Club - Team ID: '0303fde1-6f6b-4038-8198-bda1aa81ef2a'
  { name: 'Hazem Emam', age: 27, salary: 82000, teamId: '0303fde1-6f6b-4038-8198-bda1aa81ef2a' },
  { name: 'Amr Zaki', age: 28, salary: 83000, teamId: '0303fde1-6f6b-4038-8198-bda1aa81ef2a' },
  { name: 'Ramy Rabia', age: 26, salary: 80000, teamId: '0303fde1-6f6b-4038-8198-bda1aa81ef2a' },

  // Modern Sport FC - Team ID: 'b0be8333-e95d-45ba-a553-1360b9795eb6'
  { name: 'Nader Shawky', age: 29, salary: 81000, teamId: 'b0be8333-e95d-45ba-a553-1360b9795eb6' },
  { name: 'Alaa Abdelnaby', age: 27, salary: 80000, teamId: 'b0be8333-e95d-45ba-a553-1360b9795eb6' },
  { name: 'Fady Mohamed', age: 28, salary: 82000, teamId: 'b0be8333-e95d-45ba-a553-1360b9795eb6' },
]
  })
  console.log(players);
}

// createTeams();
//createPlayers();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/teams", teamRouter)
app.use("/api/players", playerRouter);
app.use("/api/auth",authRouter)


app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        status: err.statusText || 'Error',
        message: err.message,
        code: err.statusCode || 500,
        data: null
    });
});

app.listen(process.env.PORT, () => {
    console.log(`app listenning on port ${process.env.PORT}`)
})