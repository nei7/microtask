import { SetMetadata } from '@nestjs/common';

export const Permission = (...roles: string[]) => SetMetadata('roles', roles);
