-- ui/src/data/menus.js MENU_OPTIONS 기준 (메뉴별 동일 옵션)
-- menus 시드 실행 후 실행

INSERT INTO public.options (id, menu_id, name, price)
SELECT opt.id, m.id, opt.name, opt.price
FROM public.menus m
CROSS JOIN (
  VALUES
        ('extra-rice', '양많이', 1000),
    ('rice-bowl', '공기밥 추가', 1000)     
) AS opt(id, name, price)
ON CONFLICT (id, menu_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price;
