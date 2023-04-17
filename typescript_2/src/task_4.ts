import axios, {AxiosResponse} from "axios";

const COMMENTS_URL:string = 'https://jsonplaceholder.typicode.com/comments';

interface IComment {
  id: number;
  email: string;
}

const getData = async (url: string): Promise<IComment[]> => {
  const response: AxiosResponse<IComment[]> = await axios.get<IComment[]>(url);
  return response.data;
}

export const taskResult3: Promise<void> = getData(COMMENTS_URL)
  .then((data: IComment[]): void => {
    let dataTextArr: Array<string> = []
    data.forEach((comment: IComment): void => {
      dataTextArr.push(`* ID: ${comment.id}, Email: ${comment.email}...`);
    });
    console.log(`task4:\n${dataTextArr.join('\n')}`) 
  })
  .catch((error): never => {
    throw new Error(error)
  });

