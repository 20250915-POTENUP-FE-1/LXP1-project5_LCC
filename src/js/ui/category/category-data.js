export const category = [
  {value: '전체', key: 'all'},
  {value: 'AI', key: 'AI'},
  {value: '개발', key: 'develop'},
  {value: '디자인', key: 'design'},
];
export const categoryExceptKeyAll = category
  .filter(value => value.key !== 'all');