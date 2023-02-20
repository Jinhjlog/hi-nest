import {IsString, IsNumber,IsOptional} from 'class-validator';

export class CreateMovieDto{
    
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;

    // IsOptional : 유효성 검사를 무시한다.
    @IsOptional()
    @IsString({each:true})
    readonly genres: string[]

}