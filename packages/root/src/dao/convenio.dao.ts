import { ConvenioPreguntaUsuario } from "../interface";
import { ConvenioContactoDynamo, ConvenioDynamo, ConvenioModeradorDynamo } from "../model";

export interface Convenio extends ConvenioDynamo, ConvenioPreguntaUsuario {

}

export interface ConvenioContactoModerador extends ConvenioDynamo {
  contactos: ConvenioContactoDynamo[]
  moderadores: ConvenioModeradorDynamo[]
}