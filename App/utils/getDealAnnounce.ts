export const getDealAnnounce = (goodDealBadge: string) => {
  switch (goodDealBadge) {
    case 'EQUITABLE_DEAL':
      return 'Offre équitable';
    case 'BAD_DEAL':
      return 'Au dessus de marché';
    case 'NOT_COMPUTED':
      return 'Analyse indisponible';
    case 'GOOD_DEAL':
      return 'Bonne affaire';
    case 'VERY_GOOD_DEAL':
      return 'Très bonne affaire';
    default:
  }
};
