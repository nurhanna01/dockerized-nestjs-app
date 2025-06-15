import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}
  private readonly logger = new Logger(HealthController.name);

  @Get()
  @HealthCheck()
  check() {
    try {
      this.logger.log('Health Ping!');
      return this.health.check([
        () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      ]);
    } catch (error) {
      this.logger.error('Health check failed', error);
    }
  }
}
