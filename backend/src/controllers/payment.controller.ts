const requestCall = require('request');
import {v4 as uuidv4} from 'uuid';
import {uuid} from '@loopback/core';
import {inject} from '@loopback/context';
import {UserRepository} from '@loopback/authentication-jwt';

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
import {Payment, Invoice} from '../models';
import {
  PostRepository,
  PaymentRepository,
  ProposalRepository,
  ServiceProposalRepository,
  InvoiceRepository,
} from '../repositories';

import {baseMwUrl} from '../config/user-config';

export class PaymentController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @repository(PostRepository)
    public postRepository: PostRepository,
    @repository(ProposalRepository)
    public proposalRepository: ProposalRepository,
    @repository(ServiceProposalRepository)
    public serviceProposalRepository: ServiceProposalRepository,
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/payments', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
          }),
        },
      },
    })
    payment: Payment,
    // invoice: Invoice,
  ): Promise<Payment> {
    payment.paymentId = uuidv4();
    console.log('payment######', payment);
    //get the service Praposal details or post praposal details
    let productDetails: any = {};
    let postDetails: any = {};

    let productProposalId = payment.productProposalId || '';
    if (payment.productType === 'service') {
      productDetails = await this.serviceProposalRepository.findById(
        productProposalId,
        {},
      );
    } else if (payment.productType === 'post') {
      productDetails = await this.proposalRepository.findById(
        productProposalId,
        {},
      );

      postDetails = await this.postRepository.findById(payment.productId || '');
    }

    console.log('productDetails:', productDetails);

    //call paypal API to check amount captured
    const checkoutApiData = {Price: ''}; //find api and call here

    // check payment for this service already exst or first time payment
    let payentDetails: any = {};
    try {
      payentDetails = await this.paymentRepository.findById(
        payment.productProposalId,
        {},
      );
    } catch (e) {}

    //generate zoom link
    let meetingDetails: any = await new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `${baseMwUrl}/zooms/create-link`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      };
      requestCall(options, function (error: any, response: any) {
        // if (error) throw new Error(error);
        console.log('##################zoom link', error, response.body);
        return resolve(response.body);
      });
    });

    // let meetingDetails = {
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

    console.log(
      'meetingDetails:##################################',
      meetingDetails,
    );
    //parse the meeting else getting error
    if (typeof meetingDetails === 'string') {
      meetingDetails = JSON.parse(meetingDetails);
    }

    payment.zoomMeetingUrls = {
      start_url: meetingDetails.start_url,
      join_url: meetingDetails.join_url,
    };

    payment.createdDate = new Date().toString();

    let sDate = new Date();
    let days =
      payment.productType === 'post'
        ? productDetails.userRequest.days
        : productDetails.finalProposalRequest.days;
    if (typeof days === 'string') days = parseInt(days);
    let result = new Date(sDate);
    if (payment.productType === 'post') {
      result.setDate(result.getDate() + 7 * postDetails.NoOfWeeks);
    } else {
      console.log(result, result.getDate(), days);
      result.setDate(result.getDate() + days);
    }
    let eDate = result;

    payment.calendarEvent = {
      title: payment.productTitle,
      days:
        payment.productType === 'post'
          ? productDetails.userRequest.days
          : productDetails.finalProposalRequest.days,
      start: sDate,
      end: eDate,
    };

    //update status and final object in db
    if (payment.productType === 'service') {
      const serviceObj = {
        currentProposalStatus: payment.paymentType,
        zoomMeetingUrls: {
          start_url: meetingDetails.start_url,
          join_url: meetingDetails.join_url,
        },
        calendarEvent: {
          days: productDetails.finalProposalRequest.days,
          start: sDate,
          end: eDate,
        },
      };

      let obj = await this.serviceProposalRepository.updateById(
        productProposalId,
        serviceObj,
      );
    } else if (payment.productType === 'post') {
      const postObj = {
        currentProposalStatus: payment.paymentType,
        // @ts-ignore
        subscriptionID: payment.paymentObj[0].subscriptionID,
        subscribe: true,
        zoomMeetingUrls: {
          start_url: meetingDetails.start_url,
          join_url: meetingDetails.join_url,
        },
        calendarEvent: {
          title: payment.productTitle,
          hours: productDetails.userRequest.days,
          start: sDate,
          end: eDate,
        },
      };
      console.log('update propoal:', productProposalId, postObj);
      let obj = await this.proposalRepository.updateById(
        productProposalId,
        postObj,
      );
    } else {
    }

    //create Invoice
    // Invoice.invoiceId = ''
    let invoiceObj = {
      invoiceId: uuidv4(),
      paymentId: payment.paymentId,
      productType: payment.productType,
      productId: payment.productId,
      productProposalId: payment.productProposalId,
      productTitle: payment.productTitle,
      paymentObj: payment.paymentObj,
    };
    console.log('*************************start');
    let result1: any = await this.invoiceRepository.create(invoiceObj);
    console.log('*************************end', result1);
    payment.invoiceId = invoiceObj.invoiceId;
    return this.paymentRepository.create(payment);
  }

  @post('/paymentsubscPlan', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async createPaymentsubscPlan(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
          }),
        },
      },
    })
    payment: Payment,
    // invoice: Invoice,
  ): Promise<Payment> {
    payment.paymentId = uuidv4();
    console.log('***********************************step1');
    payment.createdDate = new Date().toString();

    let invoiceObj = {
      invoiceId: uuidv4(),
      paymentId: payment.paymentId,
      productType: 'subscription',
      productId: 'subscription',
      productProposalId: payment.productProposalId, //userId
      productTitle: 'standard-plan',
      paymentObj: payment.paymentObj,
    };
    console.log(
      '***********************************step1',
      payment.productProposalId,
    );

    const existingUserFilter: Filter = {
      where: {
        id: payment.productProposalId,
      },
    };

    // const user: any = await this.userRepository.findOne(existingUserFilter);
    // const email = user.email;
    await this.userRepository.updateById(payment.productProposalId || '', {
      planType: 'premium',
    });

    payment.invoiceId = invoiceObj.invoiceId;
    return this.paymentRepository.create(payment);
  }

  @get('/payments/count', {
    responses: {
      '200': {
        description: 'Payment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Payment) where?: Where<Payment>): Promise<Count> {
    return this.paymentRepository.count(where);
  }

  @get('/payments', {
    responses: {
      '200': {
        description: 'Array of Payment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Payment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Payment) filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.paymentRepository.find(filter);
  }

  @patch('/payments', {
    responses: {
      '200': {
        description: 'Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
    @param.where(Payment) where?: Where<Payment>,
  ): Promise<Count> {
    return this.paymentRepository.updateAll(payment, where);
  }

  @get('/payments/{id}', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Payment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Payment, {exclude: 'where'})
    filter?: FilterExcludingWhere<Payment>,
  ): Promise<Payment> {
    return this.paymentRepository.findById(id, filter);
  }

  @patch('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.updateById(id, payment);
  }

  @put('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.replaceById(id, payment);
  }

  @del('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }

  async getAccessTokenPaypal() {
    return new Promise((resolve, reject) => {
      let clientId = `AVFRF5NV275enN3pTik8DQcAp73hjjVbuIBoqwaOIW1Wf3kZ9OZrPNqxPhqWEvemmbRMD7kP3Q-mv4OQ`;
      let clientSecrate = `EJpDUzDkTNN_sesmoNCWPnDPrfya6u2lNDQ6WkJ1W4jWN8dmFRNuqUZibeEYQifqnQ1M9k55QJ5aEEvJ`;
      var options = {
        method: 'POST',
        url: `https://${clientId}:${clientSecrate}@api-m.sandbox.paypal.com/v1/oauth2/token`,
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
        },
        form: {
          grant_type: 'client_credentials',
        },
      };
      requestCall(options, function (error: any, response: any) {
        if (error) throw new Error(error);

        if (response && response.body && response.body) {
          let body: any;
          if (typeof response.body === 'string') {
            body = JSON.parse(response.body);
          }
          console.log('ACCESS TOKEN :  ', body.access_token);
          return resolve(body.access_token);
        }
        console.log(error, response.body);
        throw new Error('unable to get the token');
      });
    });
  }

  async createProduct(
    productDetails: any,
    accessToken: string,
    PayPalrequestId: string,
  ) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        url: 'https://api.sandbox.paypal.com/v1/catalogs/products',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': PayPalrequestId,
        },
        body: JSON.stringify(productDetails),
      };
      requestCall(options, function (error: any, response: any) {
        if (error) throw new Error(error);

        if (response && response.body && response.body) {
          let body: any;
          if (typeof response.body === 'string') {
            body = JSON.parse(response.body);
          }
          console.log('PRODUCT ID:  ', body.id);
          return resolve(body.id);
        }
        console.log(error, response.body);
        throw new Error('unable to get the token');
      });

      return '';
    });
  }

  async createPlan(
    planDetails: any,
    accessToken: string,
    PayPalrequestId: string,
  ) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        url: 'https://api.sandbox.paypal.com/v1/billing/plans',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': PayPalrequestId,
        },
        body: JSON.stringify(planDetails),
      };
      requestCall(options, function (error: any, response: any) {
        if (error) throw new Error(error);

        if (response && response.body && response.body) {
          let body: any;
          if (typeof response.body === 'string') {
            body = JSON.parse(response.body);
          }
          console.log('PLAN ID:  ', body.id);
          return resolve(body.id);
        }
        console.log(error, response.body);
        throw new Error('unable to get the token');
      });

      return '';
    });
  }

  async cancelSubscription(
    body: any,
    accessToken: string,
    subscriptionId: string,
  ) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        url: `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      requestCall(options, function (error: any, response: any) {
        console.log(
          'cancelSubscription api response:',
          `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
          error,
          response.statusCode,
          response.body,
        );
        if (error) throw new Error(error);

        if (response && response.statusCode && response.statusCode === 204) {
          return resolve({msg: 'subscription canceled'});
        }
        if (response && response.statusCode && response.statusCode === 404) {
          return resolve({msg: 'Not Found!'});
        }

        throw new Error(error);
      });

      return '';
    });
  }

  @post('/paypalSubscription', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async HandlepaypalSubscription(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
          }),
        },
      },
    })
    payment: Payment,
    // invoice: Invoice,
  ): Promise<any> {
    console.log('*******************************************************');
    let {
      // @ts-ignore
      name = '',
      // @ts-ignore
      description = '',
      // @ts-ignore
      type = '',
      // @ts-ignore
      category = '',
      // @ts-ignore
      price = '',
      // @ts-ignore
      currency = '',
      // @ts-ignore
      image_url = '',
      // @ts-ignore
      home_url = '',
    } = payment.productDetails;

    let productDetails = {
      name,
      description,
      type,
      category,
      image_url,
      home_url,
    };
    // GET PAYPAL ACCESS TOKEN
    let accessToken: any = await this.getAccessTokenPaypal();

    // CREATE AN PRODUCT
    let PayPalrequestId: string = `PLAN-${uuidv4()}`;
    let productId = await this.createProduct(
      productDetails,
      accessToken,
      PayPalrequestId,
    );

    // CREATE PLAN
    let plan = {
      product_id: `${productId}`,
      name: name,
      description: description,
      status: 'ACTIVE',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'WEEK',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 4,
          pricing_scheme: {
            fixed_price: {
              value: price,
              currency_code: currency,
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: '10',
          currency_code: currency,
        },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
      taxes: {
        percentage: '0',
        inclusive: true,
      },
    };

    let planId = await this.createPlan(plan, accessToken, PayPalrequestId);

    return {planId};
  }

  @post('/cancelPaypalSubscription', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async cancelPaypalSubscription(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
          }),
        },
      },
    })
    payment: Payment,
    // invoice: Invoice,
  ): Promise<any> {
    // GET PAYPAL ACCESS TOKEN
    let accessToken: any = await this.getAccessTokenPaypal();
    console.log('check here :', payment);
    let {
      // @ts-ignore
      subscriptionId = '',
    } = payment;

    // GET PAYPAL ACCESS TOKEN
    let result: any = await this.cancelSubscription(
      {
        reason: 'Not satisfied with the service',
      },
      accessToken,
      subscriptionId,
    );

    return result;
  }

  @post('/adaptivepayapa', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async adaptivepayapa(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
          }),
        },
      },
    })
    payment: Payment,
    // invoice: Invoice,
  ): Promise<any> {
    console.log('&&&&&&&&&&&&&&&&');

    const userId = 'sb-l5ijc3260396_api1.business.example.com',
      password = '49KVW5DRANV8JXLJ',
      signature = 'AcmvycUV3Y4sxBksuzJSHxjj0P1HAwb5GfXWH5zYlooiYL228hf5-qzP',
      appId = 'APP-80W284485P519543T';

    var Paypal = require('paypal-adaptive');

    var paypalSdk = new Paypal({
      userId: userId,
      password: password,
      signature: signature,
      sandbox: true, //defaults to false
    });

    var payload = {
      requestEnvelope: {
        errorLanguage: 'en_US',
      },
      actionType: 'PAY',
      currencyCode: 'GBP',
      feesPayer: 'EACHRECEIVER',
      memo: 'Chained payment example',
      cancelUrl: 'http://localhost:3001/handleAdaptivePayment',
      returnUrl: 'http://localhost:3001/handleAdaptivePayment',
      receiverList: {
        receiver: [
          {
            email: 'sb-gbovd5547572@business.example.com',
            amount: '21.00',
            primary: 'true',
          },
          {
            email: 'sb-rxbsp2989871@personal.example.com',
            amount: '11.00',
            primary: 'false',
          },
        ],
      },
    };

    paypalSdk.pay(payload, function (err: any, response: any) {
      if (err) {
        console.log(err, response);
      } else {
        // Response will have the original Paypal API response
        console.log(response);
        // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
        console.log('Redirect to %s', response.paymentApprovalUrl);
      }
    });

    return 'asfd';

    var requestData = {
      requestEnvelope: {
        errorLanguage: 'en_US',
        detailLevel: 'ReturnAll',
      },
      payKey: 'SJEXE6TD3UNSQ',
    };

    paypalSdk.callApi('AdaptivePayments/PaymentDetails', requestData, function (
      err: any,
      response: any,
    ) {
      if (err) {
        // You can see the error
        console.log(err);
        //And the original Paypal API response too
        console.log(response);
      } else {
        // Successful response
        console.log(response);
      }
    });

    return 'asdffsad';

    // var request = require('request');
    var options = {
      method: 'POST',
      url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay',
      headers: {
        'X-PAYPAL-SECURITY-USERID': 'sb-l5ijc3260396_api1.business.example.com',
        'X-PAYPAL-SECURITY-PASSWORD': '49KVW5DRANV8JXLJ',
        'X-PAYPAL-SECURITY-SIGNATURE':
          'AcmvycUV3Y4sxBksuzJSHxjj0P1HAwb5GfXWH5zYlooiYL228hf5-qzP',
        'X-PAYPAL-REQUEST-DATA-FORMAT': 'NV',
        'X-PAYPAL-RESPONSE-DATA-FORMAT': 'NV',
        'X-PAYPAL-APPLICATION-ID': 'APP-80W284485P519543T',
      },
      formData: {
        actionType: 'PAY',
        senderEmail: 'rajan23024@gmail.com',
        cancelUrl: 'https://example.com',
        currencyCode: 'USD',

        returnUrl: 'http://localhost:3001/adaptivepayapa',
      },
    };

    await new Promise((resolve, reject) => {
      console.log('#######################################');
      requestCall(options, function (error: any, response: any) {
        if (error) console.log('error $$$', error);
        console.log('$$$$$$$$$$$$$$$$$', response.body);
      });
    });
    return 'asfd';
  }

  @get('/handleAdaptivePayment', {
    responses: {
      '200': {
        description: 'Array of Payment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Payment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async handleAdaptivePayment(
    @param.filter(Payment) filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    console.log(this.req.query);
    console.log('asdf');
    return this.paymentRepository.find(filter);
  }
}
