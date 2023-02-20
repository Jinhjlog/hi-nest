import { PartialType } from '@nestjs/mapped-types';
import {IsString, IsNumber} from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// 이렇게 설정하면 UpdateMovieDto와 CreateMovieDto는 같다
// 필수사항만 아니라는 것만 제외하면
export class UpdateMovieDto extends PartialType(CreateMovieDto) {

    
}