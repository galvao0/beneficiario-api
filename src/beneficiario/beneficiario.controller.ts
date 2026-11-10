import { Body, Controller, Inject, Post } from "@nestjs/common";
import { BeneficiarioService } from "./beneficiario.service.js";
import { CpfDto } from "./dto/cpf.dto.js";

@Controller('beneficiario')
export class BeneficiarioController {

    @Inject(BeneficiarioService)
    benService: BeneficiarioService

    @Post()
    async status(@Body() dto: CpfDto): Promise<string> {
        return await this.benService.status(dto)
    }
}