import express from 'express';
import { asyncWrapper } from '../middlewares/wrapper';
import { getAllTeams, getOneTeam, getAllPlayersInTeam, updateShirt} from '../controllers/team.controller';
import { validator } from '../middlewares/validation';
import { shirtColorValidation, teamIdValidation } from '../middlewares/validationArrays';
import verifyToken from '../middlewares/verifyToken';
const router = express.Router();

router.route("/").get(verifyToken,asyncWrapper(getAllTeams));
router.route("/:teamId")
    .get(verifyToken, asyncWrapper( getOneTeam))
    .put(verifyToken, teamIdValidation, shirtColorValidation, validator,asyncWrapper(updateShirt));
router.route("/:teamId/players").get(verifyToken, asyncWrapper(getAllPlayersInTeam));
export default router