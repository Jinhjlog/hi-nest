import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      // 위에서 모듈을 받아오고 있기 때문에 service에 접근이 가능
      const result = service.getAll();
      // result가 배열인지 확인
      expect(result).toBeInstanceOf(Array);

    })
  })
  
  describe("getOne()", () =>{
    it("should return a movie", () => {
      service.create({
        title:"test",
        genres:['test'],
        year: 2000
      });

      const movie = service.getOne(1);
      
      // toBeDefined << 선언이 되었는지
      expect(movie).toBeDefined();

      expect(movie.id).toEqual(1);
    });
  
    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.")
      }
    });
  });

  describe("deleteOne()", () => {
    // 2가지 옵션 
    // 1. 제대로 작동해서 movie 하나를 지우는 것
    // 2. movie하나를 지우려는데 movie를 못찾는 것

    it("delete a movie", () => {
      service.create({
        title:"test",
        genres:['test'],
        year: 2000
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      //expect(afterDelete.length).toEqual(allMovies.length - 1);
      expect(afterDelete.length).toBeLessThan(allMovies.length);
      // tobeLessThan() << 대상이 매개변수보다 더작을때 true  
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      }catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });



  });

  describe("creat()", () => {
    it("should create a moive", () => {
      const beforeCreate = service.getAll().length  
      service.create({
          title:"test",
          genres:['test'],
          year: 2000
      });

      const afterCreate = service.getAll().length

      expect(afterCreate).toBeGreaterThan(beforeCreate)

    });
  })
  
  describe("update()", () => {
    it("should update a movie", () =>{
      service.create({
        title:"test",
        genres:['test'],
        year: 2000
      });
      const before = service.getOne(1);
      service.update(1, {
        title:"testUpdate",
        genres:['test', 'testUpdate'],
        year:2020
      })
      const after = service.getOne(1);

      expect(after.title).toEqual("testUpdate");
    
    })
    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {});
      }catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
