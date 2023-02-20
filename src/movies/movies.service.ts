import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];


    getAll(): Movie[] {
        // 지금 만드는 것은 가짜 데이터베이스
        // 진짜 데이터베이스는 쿼리문이 올 것임
        return this.movies;

    }

    getOne(id: number): Movie {
        console.log("type")
        console.log(typeof id)
        const movie = this.movies.find(movie1 => movie1.id === id);// or parseInt(id); 형변환 +id 
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: number) {
        // 먼저 값이 존재하는지 확인
        this.getOne(id)

        // fiter 결과가 true일떄 해댱하는 것을 빼고 리턴
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData : CreateMovieDto) {
       this.movies.push({
        id: this.movies.length +1,
        ...movieData,
       })
    }

    update(id:number , updateData:UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
        
    }
}


