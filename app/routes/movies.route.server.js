import { Router } from "express";

import { DisplayMovieList, DisplayMovieAddPage, ProcessMovieAddPage, ProcessMovieEditPage, DisplayMovieEditPage, ProcessMovieDelete } from "../controllers/movies.controller.server.js";

const router = Router();

router.get('/list', DisplayMovieList);
router.get('/movie-add', DisplayMovieAddPage);
router.post('/movie-add', ProcessMovieAddPage);
router.post('/movie-edit/:id', ProcessMovieEditPage);
router.get('/movie-edit/:id', DisplayMovieEditPage);
router.get('/movie-delete/:id', ProcessMovieDelete);

export default router;