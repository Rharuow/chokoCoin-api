import sgMail from "@sendgrid/mail";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { ICurrentUser } from "../types/IUser";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationToken = async (data: ICurrentUser) => {
  const msg = {
    to: data.email,
    from: "chokocoin.suporte@gmail.com",
    subject: "Confirmação de Cadastro",
    text: `Link para confirmação`,
    html: `<h1>Olá ${data.username}</h1> 
      <p>Clique no link abaixo para o próximo passo do seu cadastro:</p> 
      <a target="_blank" href="${process.env.WEB_URL}/signup/confirmation?email=${data.email}&token=${data.token}"> Seguir com meu cadastro </a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.delete(data.id);
    throw new Error(`Sendgrid: ${error.message}`);
  }
};

export { sendConfirmationToken };
