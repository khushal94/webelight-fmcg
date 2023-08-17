import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../models/product/create-product.dto';
import { UpdateProductDto } from '../models/product/update-product.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Product } from '../models/product/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { AllProductsDto } from '../models/product/all-products.dto';
import { FilterProductsDto } from 'src/models/product/filter-products.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List products by pagination',
    type: [Product],
  })
  findProductPaginated(@Query() query: AllProductsDto) {
    return this.productService.paginateProducts(query);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  @Get('filtered')
  @ApiResponse({
    status: 200,
    description: 'List of filtered products',
    type: [Product],
  })
  findFilteredProducts(@Query() filterDto: FilterProductsDto) {
    return this.productService.findFilteredProducts(filterDto);
  }
}
