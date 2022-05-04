import { MailAdapter } from "../providers/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRespository";

interface SubmitFeedbacUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbacUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type ||  !comment) {
      throw new Error("Type or comment is invalid")
    }
  
    //se uma foto foi passada e esta foto não começar com data:image/png;base64 é retornado um erro
    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
