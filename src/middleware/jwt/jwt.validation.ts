import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidateUser implements PipeTransform {
    private readonly users: Array<{ username: string; password: string }> = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
    ];

    transform(value: { username: string; password: string }, metadata: ArgumentMetadata) {
        const { username, password } = value;

        const user = this.users.find(
            (user) => user.username === username && user.password === password,
        );

        if (!user) {
            throw new BadRequestException('Invalid username or password');
        }

        return { username: user.username };
    }
}
