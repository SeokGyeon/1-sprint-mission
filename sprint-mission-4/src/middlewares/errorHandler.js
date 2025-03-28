export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "서버 오류가 발생했습니다.",
  });
}
