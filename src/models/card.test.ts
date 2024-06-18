import Card from './card';
import { expect, describe, beforeEach, it } from 'vitest'

describe('Card', () => {
  let card: Card;

  beforeEach(() => {
    card = new Card();
  });

  it('should have a default time of 2', () => {
    expect(card.time).greaterThanOrEqual(0.5);
    expect(card.time).lessThanOrEqual(3);
  });

  it('should start work', () => {
    card.start();
    expect(card.isProcessing).toBe(true);
  });

});