import {cardBtnOption} from "../ui/card/card.js";

export function rebindCardClick(cardNode, indexOrId) {
  // 1) 기존 리스너 제거 (같은 참조여야 함)
  if (cardNode._clickHandler) {
    cardNode.removeEventListener('click', cardNode._clickHandler);
  }

  // 2) 인덱스 계산: 파라미터가 없으면 id나 dataset에서 추출
  let i = indexOrId;
  if (i == null) {
    const byId = cardNode.id?.match(/^card-(\d+)$/);
    if (byId) i = Number(byId[1]);
    else if (cardNode.dataset?.index != null) i = Number(cardNode.dataset.index);
  }

  // 3) 새 핸들러 등록
  const handler = () => cardBtnOption(i);
  cardNode.addEventListener('click', handler);

  // 4) 나중에 제거할 수 있도록 참조 저장
  cardNode._clickHandler = handler;
}