import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getHeader(): string {
    return '<header><h1>Stogare</h1></header>';
  }

  getFooter(): string {
    return '<footer><p>© 2024 jobs/dev_esteban</p></footer>';
  }

  getLayout(content: string): string {
    return `
    <html>
      <head>
        <title>default</title>
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
        <main>${content}</main>
      </body>
        ${this.getFooter()}
    </html>
  `;
  }
}
