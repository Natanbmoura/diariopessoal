import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuarioService {
   constructor(
       @InjectRepository(Usuario)
       private usuariosRpository:Repository<Usuario>,
   ){}




   async create(usuarioData:UsuarioDto): Promise<Usuario> {
       const novoUsuario = this.usuariosRpository.create(usuarioData);
       return this.usuariosRpository.save(novoUsuario);
   }
findAll(): Promise<Usuario[]>{
       return this.usuariosRepository.find();
   }


   async findOne(id: number): Promise<Usuario>{
       const usuario = await this.usuariosRepository.findOneBy({id});
       if(!usuario){
           throw new NotFoundException(`Usuario com ID ${id} não encontrado.`)
       }
       return usuario;
   }


   async update(id: number, updateData: UsuarioDto): Promise<Usuario> {
       const usuario = await this.findOne(id);
       this.usuariosRepository.merge(usuario, updateData);
       return this.usuariosRepository.save(usuario);
   }


   async remove(id: number): Promise<void> {
       const result = await this.usuariosRepository.delete(id);
       if(result.affected === 0){
           throw new NotFoundException(`Usuário com ID ${id} não encontrado para excluir.`)
       }
   }


}

