import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  private users: { username: string; password: string }[] = [];

  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
        <body>
          <h1>Bienvenidos a nuestra página</h1>
          <p>Hola amigos, gracias por visitarnos. ¡Esperamos que disfruten su estadía!</p>
        </body>
      </html>
    `;
  }
  

  login(username: string, password: string): string {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    if (user) {
      return `Bienvenido, ${username}!`;
    } else {
      return 'Usuario o contraseña incorrectos.';
    }
  }

  signup(username: string, password: string): string {
    const existingUser = this.users.find(
      (user) => user.username === username,
    );
    if (existingUser) {
      return 'El nombre de usuario ya está en uso.';
    }
    this.users.push({ username, password });
    return 'Registro exitoso.';
  }

  about(): string {
    return `Name: ${process.env.DP_NAME}, 
            Phone: ${process.env.DP_PHONE}, 
            email: ${process.env.DP_EMAIL}`;
  }
}
