const { encrypt, decrypt } = require('..');

test('encrypt every alphabetical character by the key', () => {
  expect(encrypt(1, 'abcdefghijklmnopqrstuvwxyz'))
  .toBe('bcdefghijklmnopqrstuvwxyza');

  expect(encrypt(13, 'abcdefghijklmnopqrstuvwxyz'))
  .toBe('nopqrstuvwxyzabcdefghijklm');

  expect(encrypt(26, 'abcdefghijklmnopqrstuvwxyz'))
  .toBe('abcdefghijklmnopqrstuvwxyz');

  expect(encrypt(-1, 'abcdefghijklmnopqrstuvwxyz'))
  .toBe('zabcdefghijklmnopqrstuvwxy');
});

test('encrypt non alphabetical character not work', () => {
  expect(encrypt(1, ' 0123456789!?@#$%^&*()+-{}[]|\\:"<>,./_=\''))
  .toBe(' 0123456789!?@#$%^&*()+-{}[]|\\:"<>,./_=\'')
})

test('encrypt maintains the current case of each character', () => {
  expect(encrypt(1, 'aBcDeFgHiJkLmNoPqRsTuVwXyZ'))
  .toBe('bCdEfGhIjKlMnOpQrStUvWxYzA')
})

test('encrypt throw an error when the key is not a number', () => {
  expect(() => {
    encrypt('a', 'abcdefghijklmnopqrstuvwxyz')
  }).toThrow();
})

test('decrypt every alphabetical character by the key', () => {
  expect(decrypt(1, 'bcdefghijklmnopqrstuvwxyza'))
  .toBe('abcdefghijklmnopqrstuvwxyz');

  expect(decrypt(13, 'nopqrstuvwxyzabcdefghijklm'))
  .toBe('abcdefghijklmnopqrstuvwxyz');

  expect(decrypt(26, 'abcdefghijklmnopqrstuvwxyz'))
  .toBe('abcdefghijklmnopqrstuvwxyz');

  expect(decrypt(-1, 'zabcdefghijklmnopqrstuvwxy'))
  .toBe('abcdefghijklmnopqrstuvwxyz');
})

test('decrypt non alphabetical character not work', () => {
  expect(decrypt(1, ' 0123456789!?@#$%^&*()+-{}[]|\\:"<>,./_=\''))
  .toBe(' 0123456789!?@#$%^&*()+-{}[]|\\:"<>,./_=\'')
})

test('decrypt maintains the current case of each character', () => {
  expect(decrypt(1, 'bCdEfGhIjKlMnOpQrStUvWxYzA'))
  .toBe('aBcDeFgHiJkLmNoPqRsTuVwXyZ')
})

test('decrypt throw an error when the key is not a number', () => {
  expect(() => {
    decrypt('a', 'abcdefghijklmnopqrstuvwxyz')
  }).toThrow();
})
