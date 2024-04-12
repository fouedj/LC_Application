import format from 'format-number';

const french = {
  decimal: ',',
  decimalsSeparator: '\u00A0',
  integerSeparator: '\u00A0',
};

export const formatCm3 = format({
  ...french,
  suffix: '\u00A0cm\u00B3',
  round: 0,
});

export const formatEur = format({...french, suffix: '\u00A0€', round: 0});

export const formatInteger = format({...french, round: 0});

export const formatKm = format({...french, suffix: '\u00A0', round: 0});

export const formatM = format({...french, suffix: '\u00A0m', round: 2});

export const formatNumber = format({...french});
