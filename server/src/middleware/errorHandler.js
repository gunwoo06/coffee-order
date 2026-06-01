export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `경로를 찾을 수 없습니다: ${req.method} ${req.originalUrl}`,
  })
}

export function errorHandler(err, req, res, next) {
  console.error(err)
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    error: err.message || '서버 내부 오류가 발생했습니다.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
