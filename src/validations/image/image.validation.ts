import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidateId implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const id = parseInt(value, 10)
        if (isNaN(id)){
            throw new BadRequestException('Invalid ID. ID must be a number.')
        }
        return id;
    }
}