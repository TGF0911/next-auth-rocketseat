import { v4 as uuid } from 'uuid'

type signInRequestData = {
  email: string;
  password: string;
}

const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: signInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Thais Gennari',
      email: 'thaisgennari5001@gmail.com',
      avatar_url: 'https://github.com/TGF0911.png'
    }
  }
}

export async function recoverUserInformation() {
  await delay()

  return {
    token: uuid(),
    user: {
      name: 'Thais Gennari',
      email: 'thaisgennari5001@gmail.com',
      avatar_url: 'https://github.com/TGF0911.png'
    }

  }
}