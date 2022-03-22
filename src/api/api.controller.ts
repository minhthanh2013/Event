import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
    @Get('homepage')
    fetchHomepage(){
        
    }
}
