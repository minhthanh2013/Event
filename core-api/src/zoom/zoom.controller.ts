/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { ZoomService } from "./zoom.service";

@Controller('zoom')
export class ZoomController {
    constructor(private readonly zoomService: ZoomService) {}

    @Get()
    downloadRecord(): Observable<any>  {
        return this.zoomService.downloadRecord();
    }
}