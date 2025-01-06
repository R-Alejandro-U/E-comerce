/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class IdDTO {
    @IsUUID('4', {message: 'Debe ser un UUID valido.'})
    @ApiProperty({description: 'Debe ser un UUID valido.', example: '1111akjflab-14qe3akjbfagu-1537jbcauy-154nsvdyaf'})
    id: string;
}