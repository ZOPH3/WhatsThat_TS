import {describe, expect, test} from '@jest/globals';
import axios from 'axios';
// import { ChatSummary } from "../../src/types/api.schema.types";
import UrlBuilder from '../../src/types/url.builder';
import { AuthHeaderTest } from '../../src/util/helpers/api.helper';

const fetchChatList = async (): Promise<any> => {
  const response = await axios.get(UrlBuilder.fetchChatList(), await AuthHeaderTest());
  // .catch((error) => {
  //   throw new Error(`HTTP error, status = ${error.response.status}`);
  // });
  return response;
};

describe('API TEST', () => {
  test('response is OK', async () => {
    const data = await fetchChatList();
    expect(data.ok).toBe(true);
  });
});
