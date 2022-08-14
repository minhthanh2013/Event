import { BuySessionDto } from './models/ticket.interface';
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { EmailService } from 'src/email/email.service';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TicketEntity } from './models/ticket.entity';
import { Ticket } from './models/ticket.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(ComboSessionEntity)
    private readonly comboRepository: Repository<ComboSessionEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository:  Repository<ConferenceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository:  Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository:  Repository<PaymentEntity>,
    private readonly emailService: EmailService,
  ) {}

  findAll(): Observable<Ticket[]> {
    return from(this.ticketRepository.find());
  }
  findOne(id: number): Observable<Ticket> {
    return from(this.ticketRepository.findOne({where: {ticket_id: id}}));
  }
  async create(ticket: Ticket): Promise<Ticket> {
    const buyer = await this.userRepository.findOne({
      where: {
        user_id: ticket.buyer_id,
      }, 
    });
    const newTicket: TicketEntity = new TicketEntity();
    newTicket.buyer = buyer;
    newTicket.conference = await this.conferenceRepository.findOne({
      where: {
        conference_id: ticket.conference_id,
      },
    });
    newTicket.payment = await this.paymentRepository.findOne({
      where: {
        payment_id: ticket.payment_id,
      },
    });
    newTicket.date_buy = new Date();
    newTicket.ticket_id = ticket.ticket_id;
    const conferenceEntity = await this.conferenceRepository.findOne({
      where: {
        conference_id: ticket.conference_id,
      },
    })
    if (!conferenceEntity) {
      throw new NotFoundException('Conference not found');
    }
    conferenceEntity.current_quantity -= 1;
    try {
      this.conferenceRepository.save(conferenceEntity);
    } catch (error) {
      throw error;
    }
    const resultTicket = this.ticketRepository.save(newTicket);
    this.emailService.sendConfirmTicket(buyer.email);
    return resultTicket;
  }
  update(id: number, ticket: Ticket): Observable<UpdateResult> {
    return from(this.ticketRepository.update(id, ticket));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.ticketRepository.delete(id));
  }
  buySession(buy: BuySessionDto) {
    this.comboRepository.find({where: {combo_id: buy.combo_id}}).then(combos => {
      combos.forEach(combo => {
        const ticket: Ticket =  {} as Ticket;
        ticket.buyer_id = buy.buyer_id;
        ticket.conference_id = combo.conference_id;
        ticket.payment_id = buy.payment_id;
        this.create(ticket);
      });
    })
  }
}
