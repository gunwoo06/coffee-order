# COZY Order — Server (Express)

프론트엔드(`ui/`)와 구분되는 **백엔드 API** 프로젝트입니다.  
요구사항: [docs/PRD.md](../docs/PRD.md) Part 2 (§13~§16)

## 기술 스택

- Node.js 18+
- Express 4
- PostgreSQL + **pg**
- cors, dotenv
- nodemon (개발)

## 시작하기

```bash
cd server
npm install
npm run dev
```

최초 실행 전 `server/.env` 파일이 있는지 확인하고, 없으면 아래 내용으로 생성하세요.

```env
PORT=3001
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173,http://localhost:5174

DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=postgres
DB_PASSWORD=본인_비밀번호
```

- API: http://localhost:3001
- 헬스체크: http://localhost:3001/api/health (DB 연결 상태 포함)

PostgreSQL이 설치·실행 중이어야 합니다. 서버 시작 시 `coffee_order_db`가 없으면 자동 생성하고, 테이블(`menus`, `options`, `orders`, `order_items`)을 만듭니다.

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | nodemon으로 개발 서버 (파일 변경 시 재시작) |
| `npm start` | 프로덕션 실행 |
| `npm run db:init` | DB 생성(없을 때) + 테이블 스키마 적용 |

## 환경 변수 (`.env`)

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `PORT` | `3000` | 서버 포트 |
| `NODE_ENV` | `development` | 실행 환경 |
| `CLIENT_ORIGIN` | `http://localhost:5173` | CORS 허용 Origin (쉼표 구분) |

Vite가 5174 등 다른 포트를 쓰면 `.env`에 추가하세요.

## 폴더 구조

```
server/
├── src/
│   ├── index.js          # 진입점
│   ├── app.js            # Express 앱 설정
│   ├── config.js         # 환경 설정
│   ├── routes/           # API 라우트
│   └── middleware/       # 공통 미들웨어
├── .env
└── package.json
```

## 다음 단계

- `GET /api/menus` — 메뉴 목록
- `POST /api/orders` — 주문 생성·재고 차감
- `GET /api/orders/:id` — 주문 조회
- `/api/admin/*` — 관리자 API
