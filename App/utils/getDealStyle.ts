export const getDealStyle = (dealRank: string) => {
  switch (dealRank) {
    case 'NOT_COMPUTED':
      return {
        text: '#757575',
        border: '#D9D9D9',
        background: '#FFFFFF',
        width: 170,
      }
    case 'VERY_BAD_DEAL':
      return {
        text: '#F84A4A',
        border: '#FDD2D2',
        background: '#FEEDED',
        width: 160,
      }
    case 'BAD_DEAL':
      return {
        text: '#FC8C00',
        border: '#FEE2BF',
        background: '#FFF4E5',
        width: 180,
      }
    case 'EQUITABLE_DEAL':
      return {
        text: '#6CA69A',
        border: '#DAE9E6',
        background: '#F0F6F5',
        width: 140,
      }
    case 'GOOD_DEAL':
      return {
        text: '#50BF90',
        border: '#D3EFE3',
        background: '#EDF9F4',
        width: 125,
      }
    case 'VERY_GOOD_DEAL':
      return {
        text: '#28D68C',
        border: '#C9F5E2',
        background: '#E9FBF4',
        width: 160,
      }
  }
};