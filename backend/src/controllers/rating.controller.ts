import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {inject} from '@loopback/core';
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
import {Rating} from '../models';
import {RatingRepository} from '../repositories';
import {v4 as uuidv4} from 'uuid';
export class RatingController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository: RatingRepository,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/ratings', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRating',
          }),
        },
      },
    })
    rating: Rating,
    // UserProfile: UserProfile,
  ): Promise<any> {
    rating.ratingId = uuidv4();
    const userRatingFilter = {
      where: {
        // @ts-ignore
        ratingTypeId: rating.ratingTypeId,
      },
    };

    // GET ALL RATINGS
    let allRatingData = await this.ratingRepository.find(userRatingFilter);

    // CALCULATE AVG RATING
    let avgRating = parseInt(rating.rating ? rating.rating : '0');

    if (Array.isArray(allRatingData)) {
      let totalRate = parseInt(rating.rating ? rating.rating : '0');
      allRatingData.map(ratingItem => {
        totalRate =
          totalRate + parseInt(ratingItem.rating ? ratingItem.rating : '0');
      });
      avgRating = totalRate / (allRatingData.length + 1);
    }

    await this.userRepository.updateById(rating.ratingTypeId || '', {
      avgRating: avgRating,
    });

    // type, userId,ratingTypeId,
    rating.createdDate = new Date().toString();
    return this.ratingRepository.create(rating);
  }

  @get('/ratings/count', {
    responses: {
      '200': {
        description: 'Rating model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Rating) where?: Where<Rating>): Promise<Count> {
    return this.ratingRepository.count(where);
  }

  @get('/ratings', {
    responses: {
      '200': {
        description: 'Array of Rating model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Rating, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Rating) filter?: Filter<Rating>): Promise<Rating[]> {
    return this.ratingRepository.find(filter);
  }

  @patch('/ratings', {
    responses: {
      '200': {
        description: 'Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
    @param.where(Rating) where?: Where<Rating>,
  ): Promise<Count> {
    return this.ratingRepository.updateAll(rating, where);
  }

  @get('/ratings/{id}', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rating, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rating, {exclude: 'where'})
    filter?: FilterExcludingWhere<Rating>,
  ): Promise<Rating> {
    return this.ratingRepository.findById(id, filter);
  }

  @patch('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.updateById(id, rating);
  }

  @put('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.replaceById(id, rating);
  }

  @del('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ratingRepository.deleteById(id);
  }
}
