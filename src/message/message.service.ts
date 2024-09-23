import { Injectable } from '@nestjs/common';
import type { Message, CreateMessageDto, MessagePage, MessageId, MessageMarker } from './types';

@Injectable()
export class MessageService {

    private readonly messages: Message[] = [];
    private static readonly DEFAULT_PAGE_SIZE: number = 20;

    create(createDto: CreateMessageDto): Message {
        const msg: Message = {
            ...createDto,
            timestamp: (new Date()).getMilliseconds(),
            id: this.messages.length
        };
        this.messages.push(msg);
        return msg;
    }

    getById(id: MessageId): Message | undefined {
        return this.messages.find((m: Message) => {m.id === id});
    }

    public getLast(): MessagePage {
        const lastIndex = this.messages.length;
        return this.getInterval(lastIndex, lastIndex - MessageService.DEFAULT_PAGE_SIZE);
    }

    getPrevFrom(marker: MessageMarker): MessagePage {
        const fromId: number = marker;
        return this.getInterval(fromId, fromId - MessageService.DEFAULT_PAGE_SIZE);
    }

    private getInterval(fromId: MessageId, toId: MessageId): MessagePage {
        let leftIndex = toId >= 0 ? toId : 0;
        return {
            backward: toId > 0 ? toId : null,
            items: this.messages.slice(leftIndex, fromId)
        };
    }

}
