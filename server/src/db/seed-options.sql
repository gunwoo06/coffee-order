-- ui/src/data/menus.js MENU_OPTIONS 기준 (메뉴별 동일 옵션)
-- menus 시드 실행 후 실행

INSERT INTO public.options (id, menu_id, name, price)
SELECT opt.id, m.id, opt.name, opt.price
FROM public.menus m
CROSS JOIN (
  VALUES
    ('shot', '샷 추가', 500),
    ('syrup', '시럽 추가', 0)
) AS opt(id, name, price)
ON CONFLICT (id, menu_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price;
