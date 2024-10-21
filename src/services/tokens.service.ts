import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Session } from 'src/models/sessions.entity';

dotenv.config();

@Injectable()
export class TokensService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionModel: typeof Session,
  ) {}

  async getByToken(refreshToken: string): Promise<Session | null> {
    return this.sessionModel.findOne({
      where: { refreshToken },
    });
  }

  async removeToken(userId: string) {
    const deletedCount = await this.sessionModel.destroy({
      where: { iduser: userId },
    });

    if (deletedCount === 0) {
      throw new Error('No tokens found for this userId');
    }

    return { message: 'Tokens removed successfully', deletedCount };
  }
}
