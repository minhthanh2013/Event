import { AuthGuard } from "@nestjs/passport";

export class HostJwtGuard extends AuthGuard('host-jwt') {
    constructor() {
        super();
    }
}