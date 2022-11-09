import { Injectable } from '@nestjs/common';
import { ContactDto } from '../dto/contact.dto';

@Injectable()
export class ContactsService {
  contacts: ContactDto[] = [
    {
      uuid: '1',
      usuarioUuid: '3',
      nombre: 'Humberto',
      apellidos: 'Barrera',
      telefono: 2222222,
      email: 'hbarrera@sofka.com',
    },
    {
      uuid: '2',
      usuarioUuid: '3',
      nombre: 'Maria',
      apellidos: 'Marin',
      telefono: 3333333,
      email: 'mmarin@sofka.com',
    },
    {
      uuid: '3',
      usuarioUuid: '3',
      nombre: 'Alejandra',
      apellidos: 'Marin',
      telefono: 9009090,
      email: 'amarin@sofka.com',
    },
  ];
  getHello(): string {
    return 'Hola desde el servicio de Contacts';
  }
  getContacts(): ContactDto[] {
    return this.contacts;
  }
  getContactByUuid(uuid: string): ContactDto | undefined {
    return this.contacts.find((contact: ContactDto) => contact.uuid == uuid);
  }
  createContact(newContact: ContactDto): ContactDto {
    this.contacts.push(newContact);
    return newContact;
  }
  updateContact(
    uuid: string,
    contactUpdate: ContactDto,
  ): ContactDto | undefined {
    const contact = this.contacts.find(
      (contact: ContactDto) => contact.uuid == uuid,
    );
    if (contact != undefined) {
      contact.usuarioUuid = contactUpdate.usuarioUuid;
      contact.nombre = contactUpdate.nombre;
      contact.apellidos = contactUpdate.apellidos;
      contact.telefono = contactUpdate.telefono;
      contact.email = contactUpdate.email;
    }
    return contact;
  }
  updatePatchContact(
    uuid: string,
    contactUpdate: ContactDto,
  ): ContactDto | undefined {
    const contact = this.contacts.find(
      (contact: ContactDto) => contact.uuid == uuid,
    );
    if (contact != undefined) {
      const contactPatch: ContactDto = {
        ...contact,
        ...contactUpdate,
      };
      this.contacts = this.contacts.map((contact: ContactDto) => {
        return contact.uuid == uuid ? contactPatch : contact;
      });
      return contactPatch;
    }
    return contact;
  }
  deleteContact(uuid: string): boolean {
    const contactIndex = this.contacts.findIndex(
      (user: ContactDto) => user.uuid == uuid,
    );
    if (contactIndex == -1) return false;
    this.contacts.splice(contactIndex, 1);
    return true;
  }
}
