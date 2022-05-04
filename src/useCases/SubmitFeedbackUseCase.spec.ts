import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("Should be able to submit a feeback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,94782d831dsw2w",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("Should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,94782d831dsw2w",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,94782d831dsw2w",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Estou com bug",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
