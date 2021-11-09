const requestCall = require('request');
import {inject} from '@loopback/context';
import {v4 as uuidv4} from 'uuid';
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
  RestBindings,
  Request,
  Response,
} from '@loopback/rest';

import {
  zoomClientID,
  zoomClientSecret,
  zoomRedirectURL,
} from '../config/user-config';

import {Zoom} from '../models';
import {ZoomRepository} from '../repositories';

export class ZoomController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @repository(ZoomRepository)
    public zoomRepository: ZoomRepository,
  ) {}

  @post('/zooms/create-link', {
    responses: {
      '200': {
        description: 'Zoom model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zoom)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zoom, {
            title: 'NewZoom',
          }),
        },
      },
    })
    zoom: Zoom,
  ): Promise<any> {
    // return {
    //   uuid: 'Rl2dp5aQQxCO9G1C4Njfyw==',
    //   id: 86522244371,
    //   host_id: 'kFYxiTuQSSqWUvH7oAfV7Q',
    //   host_email: 'jugaad123it@gmail.com',
    //   topic: 'API Test',
    //   type: 2,
    //   status: 'waiting',
    //   start_time: '2020-10-28T19:44:25Z',
    //   duration: 60,
    //   timezone: 'Asia/Calcutta',
    //   created_at: '2020-10-28T19:44:25Z',
    //   start_url:
    //     'https://us05web.zoom.us/s/86522244371?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJrRll4aVR1UVNTcVdVdkg3b0FmVjdRIiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJ1czA1IiwiY2x0IjowLCJzdGsiOiJHclRVS0F6MEFaQjZxbW1MMWZha051eGZnbDhmS1l6SlA5NFVWS0hLdUF3LkFHLmJodE9lQm5fSFpDRHdYLWZxa3FRNllQZEF4QjdVbGt0dlhKaFNBaE83Y21JMmktcWo4bDFJUDN1TlIyeUhldnJZUlM5WU8zQW5LeEZlSWxjLnA0Ul8yaU8zTDh0YW9tTXo5SDFHUXcuSW9zcGcwWnZ3Ui1HU3d6eSIsImV4cCI6MTYwMzkyMTQ2NSwiaWF0IjoxNjAzOTE0MjY1LCJhaWQiOiIwSE11THNkbFN3bVl6SDZ1VWZRdENBIiwiY2lkIjoiIn0.pSadIH7_UjjvWoYf-TBcNHLQS_AxH18p4jbuXS11Nz4',
    //   join_url:
    //     'https://us05web.zoom.us/j/86522244371?pwd=b0pKMGNFV3hLazhZaFV3Umd3QklUQT09',
    //   password: 'UrHxy8',
    //   h323_password: '174259',
    //   pstn_password: '174259',
    //   encrypted_password: 'b0pKMGNFV3hLazhZaFV3Umd3QklUQT09',
    //   settings: {
    //     host_video: false,
    //     participant_video: false,
    //     cn_meeting: false,
    //     in_meeting: false,
    //     join_before_host: true,
    //     mute_upon_entry: false,
    //     watermark: false,
    //     use_pmi: false,
    //     approval_type: 2,
    //     audio: 'both',
    //     auto_recording: 'local',
    //     enforce_login: false,
    //     enforce_login_domains: '',
    //     alternative_hosts: '',
    //     close_registration: false,
    //     show_share_button: false,
    //     allow_multiple_devices: false,
    //     registrants_confirmation_email: true,
    //     waiting_room: false,
    //     request_permission_to_unmute_participants: false,
    //     registrants_email_notification: true,
    //     meeting_authentication: false,
    //     encryption_type: 'enhanced_encryption',
    //   },
    // };

    const clientID = zoomClientID;
    const clientSecret = zoomClientSecret;
    const redirectURL = zoomRedirectURL;

    // const clientID = 'xJqebmqLReuKkLc7qv9Q';
    // const redirectURL = 'https://jugaad-mw.herokuapp.com/zooms';
    // const clientSecret = 'OHI4rcXAfycLMes5PgekLEXtOMwSWLBC';

    const zoomAuthInfo: any = await this.zoomRepository.findById(clientID, {});
    console.log(
      'zoomAuthInfo********************',
      JSON.stringify(zoomAuthInfo),
    );
    if (zoomAuthInfo.access_token) {
      let meetingDetails = await new Promise((resolve, reject) => {
        let options = {
          method: 'POST',
          url: `https://api.zoom.us/v2/users/${zoomAuthInfo.user.id}/meetings`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${zoomAuthInfo.access_token}`,
          },
          json: {
            created_at: '2019-09-05T16:54:14Z',
            duration: 60,
            id: 1100000,
            settings: {
              alternative_hosts: '',
              approval_type: 2,
              audio: 'both',
              auto_recording: 'local',
              close_registration: false,
              cn_meeting: false,
              enforce_login: false,
              enforce_login_domains: '',
              host_video: false,
              in_meeting: false,
              join_before_host: true,
              mute_upon_entry: false,
              participant_video: false,
              registrants_confirmation_email: true,
              use_pmi: false,
              waiting_room: false,
              watermark: false,
              registrants_email_notification: true,
            },
            start_time: '2019-08-30T22:00:00Z',
            status: 'waiting',
            timezone: 'IN',
            topic: 'API Test',
            type: 2,
            uuid: 'ng1MzyWNQaObxcf3+Gfm6A==',
          },
        };

        console.log('options :', options);

        requestCall.post(options, function (
          error: any,
          response: any,
          body: any,
        ) {
          console.log('API Result:', error, body);
          if (error) throw new Error(error);
          else return resolve(body);
        });
      });

      return meetingDetails;
    }
    return 'Unable to create zoom link';
  }

  @get('/zooms/count', {
    responses: {
      '200': {
        description: 'Zoom model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Zoom) where?: Where<Zoom>): Promise<Count> {
    return this.zoomRepository.count(where);
  }

  @get('/zooms', {
    responses: {
      '200': {
        description: 'Array of Zoom model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Zoom, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Zoom) filter?: Filter<Zoom>): Promise<Zoom[]> {
    const clientID = zoomClientID;
    const clientSecret = zoomClientSecret;
    const redirectURL = zoomRedirectURL;

    // const clientID = 'xJqebmqLReuKkLc7qv9Q';
    // const redirectURL = 'https://jugaad-mw.herokuapp.com/zooms';
    // const clientSecret = 'OHI4rcXAfycLMes5PgekLEXtOMwSWLBC';
    console.log(this.req.query.code);
    if (!this.req.query.code) {
      this.res.redirect(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}`,
      );

      return this.zoomRepository.find(filter);
    }
    console.log('code################', this.req.query.code);
    let url =
      'https://zoom.us/oauth/token?grant_type=authorization_code&code=' +
      this.req.query.code +
      '&redirect_uri=' +
      redirectURL;

    let authInfo: any = await new Promise((resolve, reject) => {
      requestCall
        .post(url, (error: any, response: any, body: any) => {
          // Parse response to JSON
          body = JSON.parse(body);

          // Logs your access and refresh tokens in the browser
          console.log(`access_token: ${body.access_token}`, url);
          console.log(`refresh_token: ${body.refresh_token}`);

          if (body.access_token) {
            return resolve(body);
          }

          return;
        })
        .auth(clientID, clientSecret);
    });

    let UserDetails: object = await new Promise((resolve, reject) => {
      requestCall
        .get(
          'https://api.zoom.us/v2/users/me',
          (error: any, response: any, body: any) => {
            if (error) {
              console.log('API Response Error: ', error);
              if (error) throw new Error(error);
            } else {
              body = JSON.parse(body);
              // Display response in console
              console.log('API call ', body);
              return resolve(body);
            }
          },
        )
        .auth(null, null, true, authInfo.access_token);
    });

    console.log(
      'authInfo :',
      typeof authInfo,
      authInfo,
      authInfo.access_token,
      authInfo.refresh_token,
      !authInfo,
      UserDetails,
    );

    if (authInfo) {
      this.res.redirect(
        'https://zoom.us/oauth/authorize?response_type=code&client_id=' +
          clientID +
          '&redirect_uri=' +
          redirectURL,
      );
    }

    const objZoom = {
      zoomId: clientID,
      clientID: clientID,
      authInfo: authInfo,
      access_token: authInfo.access_token,
      refresh_token: authInfo.refresh_token,
      user: UserDetails,
    };
    let clients = null;

    try {
      clients = await this.zoomRepository.findById(clientID, filter);
    } catch (e) {}

    if (clients) {
      await this.zoomRepository.updateById(clientID, objZoom);
    } else {
      await this.zoomRepository.create(objZoom);
    }

    return this.zoomRepository.find(filter);
  }

  @patch('/zooms', {
    responses: {
      '200': {
        description: 'Zoom PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zoom, {partial: true}),
        },
      },
    })
    zoom: Zoom,
    @param.where(Zoom) where?: Where<Zoom>,
  ): Promise<Count> {
    return this.zoomRepository.updateAll(zoom, where);
  }

  @get('/zooms/{id}', {
    responses: {
      '200': {
        description: 'Zoom model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Zoom, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Zoom, {exclude: 'where'}) filter?: FilterExcludingWhere<Zoom>,
  ): Promise<Zoom> {
    return this.zoomRepository.findById(id, filter);
  }

  @patch('/zooms/{id}', {
    responses: {
      '204': {
        description: 'Zoom PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zoom, {partial: true}),
        },
      },
    })
    zoom: Zoom,
  ): Promise<void> {
    await this.zoomRepository.updateById(id, zoom);
  }

  @put('/zooms/{id}', {
    responses: {
      '204': {
        description: 'Zoom PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() zoom: Zoom,
  ): Promise<void> {
    await this.zoomRepository.replaceById(id, zoom);
  }

  @del('/zooms/{id}', {
    responses: {
      '204': {
        description: 'Zoom DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.zoomRepository.deleteById(id);
  }
}
