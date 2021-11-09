import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {Wishlist} from '../models';
import {WishlistRepository} from '../repositories';
// @authenticate('jwt')
export class WishlistController {
  constructor(
    @repository(WishlistRepository)
    public wishlistRepository: WishlistRepository,
  ) {}

  @post('/wishlists', {
    responses: {
      '200': {
        description: 'Wishlist model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wishlist)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {
            title: 'NewWishlist',
          }),
        },
      },
    })
    wishlist: Wishlist,
  ): Promise<Wishlist> {
    wishlist.wishlistId = uuidv4();
    return this.wishlistRepository.create(wishlist);
  }

  @get('/wishlists/count', {
    responses: {
      '200': {
        description: 'Wishlist model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Wishlist) where?: Where<Wishlist>): Promise<Count> {
    return this.wishlistRepository.count(where);
  }

  @get('/wishlists', {
    responses: {
      '200': {
        description: 'Array of Wishlist model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Wishlist, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Wishlist) filter?: Filter<Wishlist>,
  ): Promise<Wishlist[]> {
    return this.wishlistRepository.find(filter);
  }

  @patch('/wishlists', {
    responses: {
      '200': {
        description: 'Wishlist PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {partial: true}),
        },
      },
    })
    wishlist: Wishlist,
    @param.where(Wishlist) where?: Where<Wishlist>,
  ): Promise<Count> {
    return this.wishlistRepository.updateAll(wishlist, where);
  }

  @get('/wishlists/{id}', {
    responses: {
      '200': {
        description: 'Wishlist model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Wishlist, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Wishlist, {exclude: 'where'})
    filter?: FilterExcludingWhere<Wishlist>,
  ): Promise<Wishlist> {
    return this.wishlistRepository.findById(id, filter);
  }

  @patch('/wishlists/{id}', {
    responses: {
      '204': {
        description: 'Wishlist PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {partial: true}),
        },
      },
    })
    wishlist: Wishlist,
  ): Promise<void> {
    await this.wishlistRepository.updateById(id, wishlist);
  }

  @put('/wishlists/{id}', {
    responses: {
      '204': {
        description: 'Wishlist PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() wishlist: Wishlist,
  ): Promise<void> {
    await this.wishlistRepository.replaceById(id, wishlist);
  }

  @del('/wishlists/{id}', {
    responses: {
      '204': {
        description: 'Wishlist DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wishlistRepository.deleteById(id);
  }
}
