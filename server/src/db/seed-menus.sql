-- ui/src/data/menus.js 기준 초기 메뉴 데이터
-- 실행: psql -U postgres -d coffee_order_db -f server/src/db/seed-menus.sql
-- 또는 pgAdmin에서 coffee_order_db에 붙여넣기 후 실행

INSERT INTO public.menus (id, name, description, price, image_url, stock_quantity)
VALUES
  (
    'americano-ice',
    '아메리카노(ICE)',
    '시원하고 깔끔한 아이스 아메리카노',
    4000,
    '/menus/americano-ice.png',
    10
  ),
  (
    'americano-hot',
    '아메리카노(HOT)',
    '진한 에스프레소의 깊은 맛',
    4000,
    '/menus/americano-hot.png',
    10
  ),
  (
    'cafe-latte',
    '카페라떼',
    '부드러운 우유와 에스프레소의 조화',
    5000,
    '/menus/cafe-latte.png',
    10
  ),
  (
    'cappuccino',
    '카푸치노',
    '풍성한 우유 거품이 일품',
    5000,
    '/menus/cappuccino.png',
    10
  ),
  (
    'cold-brew',
    '콜드브루',
    '12시간 저온 추출한 콜드브루',
    5500,
    '/menus/cold-brew.png',
    10
  ),
  (
    'vanilla-latte',
    '바닐라라떼',
    '달콤한 바닐라 시럽이 들어간 라떼',
    5500,
    '/menus/vanilla-latte.png',
    10
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  stock_quantity = EXCLUDED.stock_quantity,
  updated_at = NOW();

-- 확인
-- SELECT * FROM public.menus;
