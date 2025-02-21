import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { validate as isUUID} from 'uuid';
const prisma = new PrismaClient()

async function getAllPlayers(req: Request, res: Response, next: NextFunction) { 
    const players = await prisma.player.findMany()
    res.status(200).json({
        status: "SUCCESS",
        message: "players retrieved successfully",
        data: players
    })
}


async function getOnePlayersInTeam(req: Request, res: Response, next: NextFunction) {
    const playerId = req.params.playerId;
    if (!isUUID(playerId)) {
        const error = new AppError("Invalid player ID", 400, "FAIL");
        return next(error);
    }
    const player = await prisma.player.findUnique({
        where: { id: playerId},
        include: { team: true }
    })
    if (!player) {
        const error = new AppError("Player not found ", 404, "FAIL");
        return next(error);
     }
    
    res.status(200).json({
        status: "SUCCESS",
        message: "player retrieved successfully",
        data: player
    })
}

async function searchPlayer(req:Request, res:Response, next:NextFunction) {
    const name = req.query.name;
    const players = await prisma.player.findMany({
        where: { name:  {contains: name as string}}
    })
    if (!players) {
        const error = new AppError("Player not found", 404, "FAIL");
        return next(error);
    }
    res.status(200).json({
        status: "SUCCESS",
        message: "Players retrieved successfully",
        data: players
    })
}

async function createPlayer(req: Request, res: Response, next: NextFunction) { 
    const { name, age, salary, teamId } = req.body;

    const playerExists = await prisma.player.findFirst({
        where: { name: name, teamId: teamId }
    })
    if (playerExists) {
        const error = new AppError("Player already exists", 400, "FAIL");
        return next(error);
    }

    const player = await prisma.player.create({
        data: {
            name,
            age,
            salary,
            teamId
        }
    })
    res.status(201).json({
        status: "SUCCESS",
        message: "Player created successfully",
        data: player
    })
}

async function deletePlayer(req: Request, res: Response, next: NextFunction) { 
    const playerId = req.params.playerId;
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    })
    if(!player) {
        const error = new AppError("Player not found", 404, "FAIL");
        return next(error);
    }
    await prisma.player.delete({
        where: { id: playerId }
    });
    res.status(204).json({
        status: "SUCCESS",
        message: "Player deleted successfully",
        data: null
    })
}

async function transferPlayer(req: Request, res: Response, next: NextFunction) { 
    const playerId = req.params.playerId;
    const teamId = req.body.teamId;
    if (!isUUID(teamId)) {
        const error = new AppError("Invalid team ID", 400, "FAIL");
        return next(error);
    }
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    })
    if(!player) {
        const error = new AppError("Player not found", 404, "FAIL");
        return next(error);
    }
    const updatedPlayer = await prisma.player.update({
        where: { id: playerId },
        data: { teamId: teamId }
    });
    res.status(200).json({
        status: "SUCCESS",
        message: "Player transferred successfully",
        data: updatedPlayer
    })
}

async function updateSalary(req: Request, res: Response, next: NextFunction){
    const playerId = req.params.playerId;
    const salary = req.body.salary;
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    })
    if(!player) {
        const error = new AppError("Player not found", 404, "FAIL");
        return next(error);
    }
    const updatedPlayer = await prisma.player.update({
        where: { id: playerId },
        data: { salary: salary }
    });
    res.status(200).json({
        status: "SUCCESS",
        message: "Player salary updated successfully",
        data: updatedPlayer
    })

}

export {
    getAllPlayers,
    getOnePlayersInTeam,
    searchPlayer,
    createPlayer,
    deletePlayer,
    transferPlayer,
    updateSalary
}