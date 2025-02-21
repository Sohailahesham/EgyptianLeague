import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import {validate as isUUID} from 'uuid';
const prisma = new PrismaClient()

async function getAllTeams(req:Request, res:Response, next:NextFunction) {
    const teams = await prisma.team.findMany()
    res.status(200).json({
        status: "SUCCESS",
        message: "Teams retrieved successfully",
        data: teams
    })
}

async function getOneTeam(req:Request, res:Response, next:NextFunction) {
    const teamID = req.params.teamId;
    const team = await prisma.team.findUnique({
        where: { id: teamID }
    })
    if (!team) {
        const error = new AppError("Team not found", 404, "FAIL");
        return next(error);
    }
    res.status(200).json({
        status: "SUCCESS",
        message: "Team retrieved successfully",
        data: team
    })
}

async function getAllPlayersInTeam(req:Request, res:Response, next:NextFunction) {
    const teamID = req.params.teamId;
    if (!isUUID(teamID)) {
        const error = new AppError("Invalid team ID", 400, "FAIL");
        return next(error);
    }

    const players = await prisma.player.findMany({
        where: { teamId: teamID },
        include: {team: true}
    })
    if (players.length === 0) {
        const error = new AppError("Team not found", 404, "FAIL");
        return next(error);
    }
    res.status(200).json({
        status: "SUCCESS",
        message: "players retrieved successfully",
        data: players
    })
}

async function updateShirt(req:Request, res:Response, next:NextFunction) {
    const teamID = req.params.teamId;
    const shirtColor = req.body.shirtColor;

    const team = await prisma.team.update({
        where: { id: teamID },
        data: { shirtColor: shirtColor }
    })
    res.status(200).json({
        status: "SUCCESS",
        message: "Shirt color updated successfully",
        data: team
    })
    
}

export {
    getAllTeams, getOneTeam, getAllPlayersInTeam, updateShirt
}