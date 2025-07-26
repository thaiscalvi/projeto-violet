import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farmer, FarmerDocument } from './schemas/farmer.schema';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Injectable()
export class FarmersService {
  constructor(
    @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
  ) {}

  async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const createdFarmer = new this.farmerModel(createFarmerDto);
    return createdFarmer.save();
  }

  async findAll(): Promise<Farmer[]> {
    return this.farmerModel.find().exec();
  }

  async findOne(id: string): Promise<Farmer> {
    return this.farmerModel.findById(id).exec() as Promise<Farmer>;
  }

  async update(id: string, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    return this.farmerModel
      .findByIdAndUpdate(id, updateFarmerDto, { new: true })
      .exec() as Promise<Farmer>;
  }

  async remove(id: string): Promise<any> {
  const farmer = await this.farmerModel.findById(id);

  if (!farmer) {
    throw new Error('Agricultor não encontrado');
  }

  if (farmer.active) {
    throw new Error('Não é possível excluir um agricultor ativo');
  }

  return this.farmerModel.findByIdAndDelete(id);
}
}
