import { describe, expect, test } from '@jest/globals';
import { dateToEntry } from '../utils/helper';

describe('When converting date to array entry', () => {
  test('it converts the beginning date to 0', () => {
    const beginningDate = Date.parse('2023-09-04');
    let date = new Date(0);
    date.setUTCSeconds(beginningDate / 1000);
    const convertedDate = dateToEntry(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );
    expect(convertedDate).toEqual(0);
  });
  test('it returns a random number when start time before beginning date', () => {
    const beginningDate = Date.parse('2023-09-03');
    let date = new Date(0);
    date.setUTCSeconds(beginningDate / 1000);
    const convertedDate = dateToEntry(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );
    const secondConvertedDate = dateToEntry(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );
    expect(convertedDate).not.toEqual(secondConvertedDate);
  });
});
