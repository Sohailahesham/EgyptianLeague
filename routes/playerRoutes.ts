import express from 'express';
import { asyncWrapper } from '../middlewares/wrapper';
import { createPlayer, deletePlayer, getAllPlayers, getOnePlayersInTeam, searchPlayer, transferPlayer, updateSalary } from '../controllers/player.controller';
import { validator } from '../middlewares/validation';
import{createPlayerValidation, playerIdValidation, salaryValidation} from '../middlewares/validationArrays';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.route("/search").get(verifyToken,asyncWrapper(searchPlayer));
router.route("/")
    .get(verifyToken, asyncWrapper(getAllPlayers))
    .post(verifyToken,
        createPlayerValidation
        , validator, asyncWrapper(createPlayer));

router.route("/:playerId").get(verifyToken, asyncWrapper(getOnePlayersInTeam))
    .delete(verifyToken, playerIdValidation, validator, asyncWrapper(deletePlayer));
    
router.route("/:playerId/transfer").put(verifyToken, playerIdValidation, validator, asyncWrapper(transferPlayer));
router.route("/:playerId/salary").put(verifyToken, playerIdValidation,salaryValidation,validator, asyncWrapper(updateSalary));


export default router
