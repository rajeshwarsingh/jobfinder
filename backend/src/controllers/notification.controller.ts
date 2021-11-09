import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {Notification} from '../models';
import {
  NotificationRepository,
  ServiceProposalRepository,
  ProposalRepository,
} from '../repositories';
import {v4 as uuidv4} from 'uuid';
import {type} from 'os';

export class NotificationController {
  constructor(
    @repository(NotificationRepository)
    public notificationRepository: NotificationRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ProposalRepository)
    public proposalRepository: ProposalRepository,
    @repository(ServiceProposalRepository)
    public serviceProposalRepository: ServiceProposalRepository,
  ) {}

  @post('/notifications', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Notification)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, {
            title: 'NewNotification',
          }),
        },
      },
    })
    notification: Notification,
  ): Promise<Notification> {
    notification.notificationId = uuidv4();
    notification.createdDate = new Date().toString();
    return this.notificationRepository.create(notification);
  }

  @get('/notifications/count', {
    responses: {
      '200': {
        description: 'Notification model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Notification) where?: Where<Notification>,
  ): Promise<Count> {
    return this.notificationRepository.count(where);
  }

  @get('/notifications', {
    responses: {
      '200': {
        description: 'Array of Notification model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Notification, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Notification) filter?: Filter<Notification>,
  ): Promise<Notification[]> {
    return this.notificationRepository.find(filter);
  }

  @patch('/notifications', {
    responses: {
      '200': {
        description: 'Notification PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, {partial: true}),
        },
      },
    })
    notification: Notification,
    @param.where(Notification) where?: Where<Notification>,
  ): Promise<Count> {
    return this.notificationRepository.updateAll(notification, where);
  }

  @get('/notifications/{id}', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notification, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Notification, {exclude: 'where'})
    filter?: FilterExcludingWhere<Notification>,
  ): Promise<Notification> {
    return this.notificationRepository.findById(id, filter);
  }

  @get('/notificationsByUserId/{id}', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notification, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findNotificationByUserId(
    @param.path.string('id') id: string,
    @param.filter(Notification, {exclude: 'where'})
    filter?: FilterExcludingWhere<Notification>,
  ): Promise<any> {
    // FETCH ALL UNREAD NOTIFICATION
    const filterNotification = {
      where: {
        status: 'unread',
      },
    };
    let notifData = await this.notificationRepository.find(filterNotification);
    console.log('before', notifData.length);
    notifData = notifData.filter(
      item => !(item.readedUsers || []).includes(id),
    );
    console.log('after', notifData.length);
    // FETCH USER DETAILS
    let userDetails: any = await this.userRepository.findById(id);
    // console.log('userDetails :', userDetails);
    if (!userDetails.skills) userDetails.skills = [];
    if (!userDetails.jobCategory) userDetails.jobCategory = [];
    if (!userDetails.profession) userDetails.profession = [];

    // create new api for create and clone post/service/user
    // let FinalDataOfNotification = [];
    const FinalDataOfNotification = notifData.map(item => {
      if (
        item.type === 'post' ||
        item.type === 'service' ||
        item.type === 'user'
      ) {
        console.log('check here');
        if (item.subtype === 'create') {
          console.log('check here1');
          // CHECK FOR SKILLS, CATEGORY, PROFESSION

          if (
            // @ts-ignore
            ((item.data && item.data.skills) || []).filter(itemSkill =>
              userDetails.skills.includes(itemSkill),
            ).length ||
            // @ts-ignore
            ((item.data && item.data.jobCategory) || []).filter(itemJobCat =>
              userDetails.jobCategory.includes(itemJobCat),
            ).length ||
            // @ts-ignore
            ((item.data && item.data.profession) || []).filter(itemProf =>
              userDetails.profession.includes(itemProf),
            ).length
          ) {
            return item;
          }
        } else if (item.subtype === 'delete') {
          console.log('check here2');
          let proposFilter = {
            where: {
              userId: id,
            },
          };
          if (item.type === 'post') {
            // @ts-ignore
            // proposFilter.where.postId = item.notificationTypeId;
            // const praposalData = await this.proposalRepository.find(
            //   proposFilter,
            // );
            // if (praposalData.length) return item;
          }
          if (item.type === 'service') {
            // @ts-ignore
            // proposFilter.where.serviceId = item.notificationTypeId;
            // const praposalData = await this.serviceProposalRepository.find(
            //   proposFilter,
            // );
            // if (praposalData.length) return item;
          }
        } else if (item.subtype === 'fav') {
          // need to put condition here for only fav users
          console.log('check here3');
          if (item.createrUserId === id) return item;
        } else if (
          item.subtype === 'proposal-sent' ||
          item.subtype === 'proposal-booked' ||
          item.subtype === 'proposal-completed-paid'
        ) {
          console.log(
            'check here4',
            item.createrUserId,
            id,
            item.createrUserId === id,
          );

          if (item.createrUserId === id) {
            return item;
          }

          if (item.createrUserId !== id && item.type === 'post') {
            // console.log('############################');
            return item;
          }
          // check for Praposals
        } else if (item.subtype === 'rating-sent') {
          console.log('check here rating');

          if (item.createrUserId === id) {
            return item;
          }
          // check for Praposals
        } else if (
          item.type === 'service' &&
          (item.subtype === 'edit' ||
            item.subtype === 'proposal-revised' ||
            item.subtype === 'proposal-completed' ||
            item.subtype === 'proposal-accepted' ||
            item.subtype === 'proposal-rejected')
        ) {
          console.log('check here rating1');

          if (item.createrUserId !== id) {
            return item;
          }
          // check for Praposals
        } else {
          console.log('check here5');
          return;
        }
      }
    });

    return FinalDataOfNotification.filter((item: any) => item !== undefined);

    // create new api for delete post/service/user
    // create new api for fav post/service/user
    // create new api for praposal post/service/user

    // return this.notificationRepository.findById(id, filter);
  }

  @patch('/notifications/{id}', {
    responses: {
      '204': {
        description: 'Notification PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, {partial: true}),
        },
      },
    })
    notification: Notification,
  ): Promise<void> {
    await this.notificationRepository.updateById(id, notification);
  }

  @put('/notifications/{id}', {
    responses: {
      '204': {
        description: 'Notification PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notification: Notification,
  ): Promise<void> {
    await this.notificationRepository.replaceById(id, notification);
  }

  @del('/notifications/{id}', {
    responses: {
      '204': {
        description: 'Notification DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notificationRepository.deleteById(id);
  }
}
