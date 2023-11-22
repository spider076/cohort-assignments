// src/users/usersController.ts
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Todo } from "./todo";
  import { TodoService, TodoCreationParams } from "./todoService";
  
  @Route("todos")
  export class TodoController extends Controller {
    @SuccessResponse("201", "Created") // Custom success response
    @Get("{todoId}")
    public async getTodo(
        @Path() todoId: number,
    ): Promise<Todo> {
        let todoService = new TodoService();
        return todoService.get(todoId);
    }
  }