import movieModel from '../models/movies.js';

export function DisplayMovieList(req, res, next){
    movieModel.find(function(err, moviesCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Movie List', page: 'movies/list', movies: moviesCollection});

    })
}

export function DisplayMovieAddPage(req, res, next){
    res.render('index', { title: 'Add Movie', page: 'movies/edit', movie: {}});
}
 
export function ProcessMovieAddPage(req, res, next){
    let newMovie = movieModel({
        name: req.body.name,
        year: req.body.year,
        director: req.body.genre,
        runtime: req.body.runtime
    });

    movieModel.create(newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/list')
    })
}

export function DisplayMovieEditPage(req, res, next){
    let id = req.params.id;

    movieModel.findById(id, (err, movie) => {
        if(err){
            console.error(err);
            res.ens(err);
        }

        res.render('index', { title: 'Edit Movie', page: 'movies/edit', movie: movie });
    })
   
}
export function ProcessMovieEditPage(req, res, next){

    let id = req.params.id;
    let newMovie = movieModel({
        _id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        director: req.body.genre,
        runtime: req.body.runtime
    });

    movieModel.updateOne( {_id: id}, newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/list')
    })
}
export function ProcessMovieDelete(req, res, next){
    let id = req.params.id;

    movieModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/list');
    })
}





