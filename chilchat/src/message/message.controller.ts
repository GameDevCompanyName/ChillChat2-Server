import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto, Message, MessageMarker, MessagePage } from './types';

@Controller('message')
export class MessageController {
    constructor(private msgService: MessageService) {}

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
