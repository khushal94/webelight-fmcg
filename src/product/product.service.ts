import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { CreateProductDto } from '../models/product/create-product.dto';
import { UpdateProductDto } from '../models/product/update-product.dto';
import { AllProductsDto } from '../models/product/all-products.dto';
import { Repository } from 'typeorm';
import { FilterProductsDto } from 'src/models/product/filter-products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async paginateProducts(
    query: AllProductsDto,
  ): Promise<{ items: Product[]; total: number }> {
    const { page = 1, limit = 10 } = query;
    const [items, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return { items, total };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: any): Promise<Product> {
    //return null;
    return this.productRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return null;
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findFilteredProducts(filterDto: FilterProductsDto): Promise<Product[]> {
    const { category, minPrice, maxPrice, name } = filterDto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    return queryBuilder.getMany();
  }

}
