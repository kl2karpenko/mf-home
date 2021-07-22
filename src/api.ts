import axios from 'axios';

interface AxiosResponse {
  data: any;
  status: number;
}

export default class Api {
  constructor() {
    // no-op
  }

  async predictAge(name: string): Promise<AxiosResponse> {
    return axios.get(`https://api.agify.io/?name=${name}`);
  }
}
