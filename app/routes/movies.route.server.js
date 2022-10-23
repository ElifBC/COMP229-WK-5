import { Router } from "express";

import { DisplayMovieList, DisplayMovieAddPage, ProcessMovieAddPage, ProcessMovieEditPage, DisplayMovieEditPage, ProcessMovieDelete } from "../controllers/movies.controller.server.js";
import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/list', DisplayMovieList);
router.get('/movie-add', AuthGuard, DisplayMovieAddPage);
router.post('/movie-add', AuthGuard, ProcessMovieAddPage);
router.post('/movie-edit/:id', AuthGuard, ProcessMovieEditPage);
router.get('/movie-edit/:id', AuthGuard, DisplayMovieEditPage);
router.get('/movie-delete/:id', AuthGuard,ProcessMovieDelete);

export default router;