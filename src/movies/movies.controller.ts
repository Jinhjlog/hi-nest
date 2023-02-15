import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    // 서비스에 접근
    // express.js에서처럼 수동으로 import하는건 
    // NestJS에서 기본적으로 쓰는 방법이 아니다.
    constructor(private readonly moviesService : MoviesService) {}

    @Get()
    getAll() : Movie[]{
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query("year") searchingYear:string) {
        return `We are searching for a movie made after: ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param("id") movieId: string) : Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData)  
     }

    @Delete("/:id")
    delete(@Param("id") movieId: string){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData){
        return this.moviesService.update(movieId, updateData);
    }


}