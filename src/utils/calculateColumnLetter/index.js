const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const calculateColumnLetter = (index) => {
  if (index === 0 || index === letters.length - 1) {
    return letters[index];
  }

  if (letters.length - 1 < index) {
    const letter = Math.round(index % letters.length);
    const initialLetter = Math.trunc(index / letters.length) - 1;

    return `${letters[initialLetter]}${letters[letter]}`;
  }

  return letters[index - 1];
};

export default calculateColumnLetter;
