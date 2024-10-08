import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message, MessageMarker, MessagePage } from './types';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('message')
export class MessageController {
    constructor(private msgService: MessageService) {}

    @UseGuards(JwtGuard)
    @Get('create')
    async create(
        @Query('text')
        text: string
    ): Promise<Message> {
        // TODO get user from session
        return this.msgService.create({
            author: 1,
            text
        });
    }

    @UseGuards(JwtGuard)
    @Get('getPage')
    async getPage(
        @Query('marker', new ParseIntPipe({optional: true}))
        marker?: MessageMarker
    ): Promise<MessagePage> {
        if (marker === undefined) {
            return this.msgService.getLast();
        } else {
            return this.msgService.getPrevFrom(marker);
        }
    }
}
