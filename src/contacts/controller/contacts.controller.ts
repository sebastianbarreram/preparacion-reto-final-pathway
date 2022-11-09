import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ContactDto } from '../dto/contact.dto';
import { ContactsService } from '../service/contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('message')
  getHello(): string {
    return this.contactsService.getHello();
  }

  @Get('contact')
  getAllContacts(): ContactDto[] {
    return this.contactsService.getContacts();
  }

  @Get('contact/:uuid')
  getContactByUuid(@Param('uuid') uuid: string): ContactDto | undefined {
    return this.contactsService.getContactByUuid(uuid);
  }

  @Post('contact')
  createContact(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newContact: ContactDto,
  ): ContactDto {
    return this.contactsService.createContact(newContact);
  }

  @Put('contact/:uuid')
  updateContact(
    @Param('uuid') uuid: string,
    @Body() contactUpdate: ContactDto,
  ) {
    return this.contactsService.updateContact(uuid, contactUpdate);
  }

  @Patch('contact/:uuid')
  updatePatchContact(
    @Param('uuid') uuid: string,
    @Body() contactUpdate: ContactDto,
  ) {
    return this.contactsService.updatePatchContact(uuid, contactUpdate);
  }

  @Delete('contact/:uuid')
  deleteContact(@Param('uuid') uuid: string): boolean {
    return this.contactsService.deleteContact(uuid);
  }
}
