import Bucket from './bucket';
import Card from './card';
import { expect, describe, it } from 'vitest'

describe('Bucket', () => {
  it('should create a bucket with the specified number of cards', () => {
    const cardNumber = 5;
    const bucket = new Bucket(cardNumber);
    expect(bucket.cards.length).toEqual(cardNumber);
    expect(bucket.cards.every((card: Card) => card instanceof Card)).toBe(true);
  });

  it('should create a bucket with empty cards array if cardNumber is 0', () => {
    const cardNumber = 0;
    const bucket = new Bucket(cardNumber);
    expect(bucket.cards.length).toEqual(cardNumber);
  });
});