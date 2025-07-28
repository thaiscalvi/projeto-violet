import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { CreateFarmerDto } from './dto/create-farmer.dto';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.create(createFarmerDto);
  }

  @Get()
  findAll() {
    return this.farmersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    return this.farmersService.update(id, updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmersService.remove(id);
  }

  // ✅ NOVA ROTA PARA DESATIVAR AGRICULTOR
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.farmersService.deactivate(id);
  }
}