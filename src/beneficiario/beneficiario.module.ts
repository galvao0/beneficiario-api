import { Module } from "@nestjs/common";
import { BeneficiarioService } from "./beneficiario.service.js";
import { BeneficiarioController } from "./beneficiario.controller.js";

@Module({
    providers: [BeneficiarioService],
    controllers: [BeneficiarioController]
})
export class BeneficiarioModule {}