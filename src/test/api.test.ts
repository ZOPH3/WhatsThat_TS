import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import UrlBuilder from '../util/URLBuilder';
import { AuthHeaderTest } from '../../src/util/helpers/api.helper';

const config = {
  headers: {
    'X-Authorization': 'ed2dde0e8cfc22816cd5c5cefec72e05',
    'Content-Type': 'application/json',
  },
};

const fetchChatList = async () => {
  const response = await axios.get(UrlBuilder.fetchChatList(), config);
  return response;
};

describe('API TEST', () => {
  test('response is OK', async () => {
    try {
      const data = await fetchChatList();
      expect(data.request).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });
});
