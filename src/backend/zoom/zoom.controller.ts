import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZoomService } from './zoom.service';


@Controller('zoom')
export class ZoomController {
    constructor(private readonly zoomService: ZoomService, private readonly config: ConfigService) {}
    @Get()
    createSignature() {
        return this.zoomService.generateSignature(this.config.get('ZOOM_JWT_API_KEY'),this.config.get('ZOOM_JWT_API_SECRET'), 71932578784, 0);
    }
    @Post("create")
    createMeeting()
    {
        return this.zoomService.createMeeting();
    }
    // @Get("join")
    // joinMeeting(){
    //     return this.zoomService.jointMeeting();
    // }
}
