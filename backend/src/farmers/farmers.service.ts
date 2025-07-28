import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farmer, FarmerDocument } from './schemas/farmer.schema';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { isValidObjectId } from 'mongoose';


@Injectable()
export class FarmersService {
  constructor(
    @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
  ) {}

  // Criar agricultor
  async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const createdFarmer = new this.farmerModel(createFarmerDto);
    return createdFarmer.save();
  }

  // Listar todos
  async findAll(): Promise<Farmer[]> {
    return this.farmerModel.find().exec();
  }

  // Buscar por ID
  async findOne(id: string): Promise<Farmer> {
    const farmer = await this.farmerModel.findById(id).exec();
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }
    return farmer;
  }

  // Atualizar agricultor
  async update(id: string, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    const updated = await this.farmerModel
      .findByIdAndUpdate(id, updateFarmerDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Agricultor não encontrado para atualização');
    }

    return updated;
  }

  // Remover agricultor (somente se ativo = false)
 async remove(id: string): Promise<{ message: string }> {
  const farmer = isValidObjectId(id)
    ? await this.farmerModel.findById(id)
    : null;

  if (!farmer) {
    throw new NotFoundException('Agricultor não encontrado');
  }

  if (farmer.active) {
    throw new BadRequestException(
      'Não é possível excluir um agricultor ativo',
    );
  }

  await this.farmerModel.findByIdAndDelete(id);

  return { message: 'Agricultor excluído com sucesso.' };
}

  // Desativar agricultor
  async deactivate(id: string): Promise<Farmer> {
    const farmer = await this.farmerModel.findById(id);

    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado para desativação');
    }

    farmer.active = false;
    return farmer.save();
  }
}
