import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { HomeService } from '../interface/services/service.home';

@Controller()
export class HomeAppController {
  getHeader(): string {
    return `
      <header>
        <h1>Welcome to the home</h1>
        <main>
          <button onclick="location.href='/api/hello'">Hello</button>
          <button onclick="location.href='/api/login'">Login</button>
          <button onclick="location.href='/api/signup'">Signup</button>
          <button onclick="location.href='/api/about'">About</button>
        </main>
      </header>`;
  }

  getFooter(): string {
    return '<footer><p>© 2024 jobs/dev_esteban</p></footer>';
  }

  @Get('/')
  Home(): string {
    return `
      <html>
        <head>
          <title>Home</title>
          <style>
              body { 
                font-family: 'Poppins', sans-serif; 
                margin: 0; 
                padding: 0; 
                background-color: #f0f0f5; 
                color: #333; 
              }
              header { 
                background-color: #2c3e50; 
                color: #ecf0f1; 
                padding: 30px 20px; 
                text-align: center; 
              }
              h1 {
                margin: 0;
                font-size: 2.5rem;
                font-weight: 600;
              }
              main { 
                margin-top: 20px;
              }
              button {
                background-color: #e74c3c;
                color: white;
                border: none;
                padding: 10px 20px;
                margin: 10px;
                font-size: 1rem;
                cursor: pointer;
                border-radius: 5px;
                transition: background-color 0.3s ease;
              }
              button:hover {
                background-color: #c0392b;
              }
              footer { 
                background-color: #34495e; 
                color: #bdc3c7; 
                text-align: center; 
                padding: 20px; 
                position: fixed; 
                width: 100%; 
                bottom: 0; 
                font-size: 0.9rem;
              }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        </head>
        <body>
            ${this.getHeader()}
            <img class="img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FFmOV8SCJ5fa8M%2Fgiphy.gif&f=1&nofb=1&ipt=ee543c9986bd86b3384eec740398f966a3dd66ecf9f1f93b5ab5b36ab78f45e1&ipo=images" height="70%" width="100%" alt="ghost" />
        </body>
        ${this.getFooter()}
      </html>
    `;
  }
}

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly homeServise: HomeService,
  ) {}

  @Get('hello')
  getHello(): string {
    const content = this.appService.getHello();
    return this.homeServise.getLayout(content);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }): string {
    const content = this.appService.login(body.username, body.password);
    return this.homeServise.getLayout(content);
  }

  @Post('signup')
  signup(@Body() body: { username: string; password: string }): string {
    const content = this.appService.signup(body.username, body.password);
    return this.homeServise.getLayout(content);
  }

  @Get('about')
  about(): string {
    const content = this.appService.about();
    return this.homeServise.getLayout(content);
  }
}
