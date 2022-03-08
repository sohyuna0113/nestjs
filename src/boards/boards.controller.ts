import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService: BoardsService){}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards()
    // }

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.boardService.getAllBoards(user);
    }
    // @Post() s
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    //     ) {
    //     return this.boardService.createBoard(createBoardDto)
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
        return this.boardService.createBoard(CreateBoardDto, user)
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id)
    // }

    @Delete(':/id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User
    ) : Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }
    // @Delete(':/id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id)
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardService.updateBoardStatus(id, status)
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status') status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status)
    // }
}
