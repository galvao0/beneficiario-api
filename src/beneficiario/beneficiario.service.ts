
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { CpfDto } from "./dto/cpf.dto.js";

type Resp = {
    statusContrato: { nome: string }
};

@Injectable()
export class BeneficiarioService {

    @Inject(ConfigService)
    private readonly configService: ConfigService;

    async status(dto: CpfDto): Promise<string> {
        try {
            const url = this.configService.get<string>("API_URL_BASE");

            const { data } = await axios.get<Resp[]>(
                `${url}/procurarPorCpfTitular`,
                {
                    params: {
                        cpf: dto.cpf
                    },
                    headers: {
                        accept: "application/json",
                        token: this.configService.get<string>("API_TOKEN"),
                        senhaApi: this.configService.get<string>("API_PASS"),
                    }
                }
            );
            
            return data[0]?.statusContrato.nome;

        } catch (error) {

            throw new InternalServerErrorException(
                `Não foi possível consultar o ajuste do beneficiário: ${error}`
            );
        }
    }
}